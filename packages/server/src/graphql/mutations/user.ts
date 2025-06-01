/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs'
import generateToken from '../../utils/generateToken'
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'
import sendRefreshToken from '../../utils/sendRefreshToken'
import { signUpSchema, loginSchema } from '../../validations/authPageSchemas'
import { profileChangesSchema } from '../../validations/profileChangeSchema'
interface UserInput {
  name: string
  imgUrl: string
  email: string
}

const userMutations = () => {
  return {
    updateUser: async (_: any, { input }: { input: UserInput }, { req }: MyContext) => {
      const { email, name, imgUrl } = input
      authenticate(req)
      await profileChangesSchema.validate({ email, name, imgUrl })
      return await prisma.users.update({
        where: {
          id: req.payload?.userId,
        },
        data: {
          email,
          name,
          imgUrl,
        },
      })
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string },
      { res }: MyContext,
    ) => {
      const user = await prisma.users.findUnique({ where: { email } })
      await loginSchema.validate({ email, password })
      if (!user) {
        throw new Error('Invalid login credentials')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        throw new Error('Invalid login credentials')
      }

      const { token, refreshToken } = generateToken(user.id)

      const isTokenExist = await prisma.tokens.findUnique({ where: { userId: user.id } })

      if (isTokenExist) {
        await prisma.tokens.update({
          where: {
            userId: user.id,
          },
          data: {
            token,
            refreshToken,
            expiresAt: new Date(Date.now() + 3600000), // 1 hour expiration
          },
        })
      } else {
        await prisma.tokens.create({
          data: {
            userId: user.id,
            token,
            refreshToken,
            expiresAt: new Date(Date.now() + 3600000), // 1 hour expiration
          },
        })
      }

      sendRefreshToken(res, refreshToken)

      return { token, refreshToken }
    },
    register: async (
      _: any,

      {
        email,
        username,
        password,
        rePassword,
      }: { email: string; username: string; password: string; rePassword: string },
      { res }: MyContext,
    ) => {
      await signUpSchema.validate({ email, username, password, rePassword })
      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await prisma.users.create({
        data: {
          email: email,
          name: username,
          password: hashedPassword,
        },
      })
      const { token, refreshToken } = generateToken(newUser.id)

      await prisma.tokens.create({
        data: {
          userId: newUser.id,
          token,
          refreshToken,
          expiresAt: new Date(Date.now() + 3600000), // 1 hour expiration
        },
      })

      sendRefreshToken(res, refreshToken)

      return { token, refreshToken }
    },
  }
}

export default userMutations
