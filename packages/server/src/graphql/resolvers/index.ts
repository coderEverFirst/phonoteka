/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bands, Tracks } from '@prisma/client'
import moment from 'moment'
import bcrypt from 'bcryptjs'
import generateToken from '../../utils/generateToken'
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'
import sendRefreshToken from '../../utils/sendRefreshToken'

const resolvers = {
  Query: {
    getBandById: (_: any, { id }: { id: number }, { req }: MyContext) => {
      authenticate(req)
      return prisma.bands.findUnique({
        where: {
          id,
        },
      })
    },
    getTrackByQuery: (_: any, { bandId }: { bandId: number }, { req }: MyContext) => {
      authenticate(req)
      return prisma.tracks.findMany({
        orderBy: [
          {
            releaseDate: 'asc',
          },
        ],
        where: {
          bandId,
        },
      })
    },
    getTrackById: (_: any, { id }: { id: number }, { req }: MyContext) => {
      authenticate(req)
      return prisma.tracks.findUnique({
        where: {
          id,
        },
      })
    },
    getAllBands: (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      return prisma.bands.findMany()
    },
    getAllTracks: (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      return prisma.tracks.findMany()
    },
  },
  Mutation: {
    createBand: async (_: any, { input }: { input: Bands }, { req }: MyContext) => {
      authenticate(req)
      return prisma.bands.create({
        data: input,
      })
    },
    createTrack: async (_: any, { input }: { input: Tracks }, { req }: MyContext) => {
      authenticate(req)
      const updatedTrack = {
        ...input,
        releaseDate: moment(input.releaseDate).toISOString(),
      }
      return prisma.tracks.create({
        data: updatedTrack,
      })
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string },
      { res }: MyContext,
    ) => {
      const user = await prisma.users.findUnique({ where: { email } })

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

      return { token, refreshToken, user }
    },
    register: async (
      _: any,

      {
        email,
        username,
        password,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        rePassword,
      }: { email: string; username: string; password: string; rePassword: string },
      { res }: MyContext,
    ) => {
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

      return { token, refreshToken, newUser }
    },
  },
}

export default resolvers
