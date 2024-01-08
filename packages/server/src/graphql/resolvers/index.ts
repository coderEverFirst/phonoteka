/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tracks, Bands, Prisma } from '@prisma/client'
import moment from 'moment'
import bcrypt from 'bcryptjs'
import generateToken from '../../utils/generateToken'
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'
import sendRefreshToken from '../../utils/sendRefreshToken'
import { signUpSchema, loginSchema } from '../../validations/authPageSchemas'
import { profileChangesSchema } from '../../validations/profileChangeSchema'
import { bandValidationSchema } from '../../validations/bandValidationSchema'
import { trackValidationSchema } from '../../validations/trackValidationSchema'
import getUniqueGenres from '../../utils/getUniqueGenres'

type ExtendedBands = Bands & { tracks: Array<Tracks> }
type SortOrder = 'asc' | 'desc'
interface UserInput {
  name: string
  imgUrl: string
  email: string
}

interface CreateTracks {
  bandId: number
  tracks: Tracks[]
}

interface UpdateTrack {
  bandId: number
  trackId: number
  tracks: Tracks[]
}

const resolvers = {
  Query: {
    getBandById: (_: any, { id }: { id: number }, { req }: MyContext) => {
      authenticate(req)
      return prisma.bands.findUnique({
        where: {
          id,
        },
        include: {
          tracks: true,
        },
      })
    },
    getUserById: (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      return prisma.users.findUnique({
        where: {
          id: req.payload?.userId,
        },
      })
    },
    getAllBands: (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      return prisma.bands.findMany({
        where: {
          userId: req.payload!.userId,
        },
      })
    },
    getChartData: async (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      const tracksAmount = await prisma.tracks.count()

      const trackCountsByGenre = await prisma.tracks.groupBy({
        by: ['genre'],
        _count: {
          id: true,
        },
      })

      const genreData = trackCountsByGenre.map((group, i) => ({
        id: i,
        label: group.genre,
        value: group._count.id,
      }))

      return {
        tracksAmount,
        genreData,
      }
    },
    getAllTracks: async (
      _: any,
      {
        order,
        sortBy,
        search,
        pageSize,
        pageNumber,
      }: { order: SortOrder; sortBy: string; search: string; pageSize: number; pageNumber: number },
      { req }: MyContext,
    ) => {
      authenticate(req)

      const skip = (pageNumber - 1) * pageSize

      const searchCondition: Prisma.TracksWhereInput = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { band: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }

      const allTracksCount = await prisma.tracks.count({
        where: searchCondition,
      })

      if (sortBy === 'band') {
        const tracks = await prisma.tracks.findMany({
          where: searchCondition,
          orderBy: [
            {
              band: {
                name: order,
              },
            },
          ],
          include: {
            band: true,
          },
          skip,
          take: pageSize,
        })

        return {
          allTracksCount,
          tracks,
        }
      }

      const tracks = await prisma.tracks.findMany({
        where: searchCondition,
        orderBy: [
          {
            [sortBy]: order,
          },
        ],
        include: {
          band: true,
        },
        skip,
        take: pageSize,
      })

      return {
        allTracksCount,
        tracks,
      }
    },
  },
  Mutation: {
    createBand: async (_: any, { input }: { input: ExtendedBands }, { req }: MyContext) => {
      authenticate(req)
      await bandValidationSchema.validate(input)

      const tracksInput = input.tracks

      const calculatedGenres = getUniqueGenres(tracksInput)

      const bandInput = {
        name: input.name,
        foundationDate: moment(input.foundationDate).toISOString(),
        about: input.about,
        genre: calculatedGenres,
        description: input.description,
        image: input.image,
        location: input.location,
        members: input.members,
        userId: req.payload!.userId,
      }

      const existedBand = await prisma.bands.findFirst({
        where: {
          userId: req.payload!.userId,
          name: { contains: bandInput.name, mode: 'insensitive' },
        },
      })

      if (existedBand) {
        throw new Error(`Band with name ${bandInput.name} already exists`)
      }

      const bandResult = await prisma.bands.create({
        data: bandInput,
      })

      tracksInput.map(async track => {
        return await prisma.tracks.create({
          data: {
            ...track,
            bandId: bandResult.id,
            year: moment(track.year).toISOString(),
            userId: req.payload!.userId,
          },
        })
      })

      return await prisma.bands.findUnique({
        where: {
          id: bandResult.id,
        },
        include: {
          tracks: true,
        },
      })
    },
    updateBand: async (_: any, { input }: { input: ExtendedBands }, { req }: MyContext) => {
      authenticate(req)
      await bandValidationSchema.validate(input)

      const tracksInput = input.tracks

      const calculatedGenres = getUniqueGenres(tracksInput)

      const bandInput = {
        name: input.name,
        foundationDate: moment(input.foundationDate).toISOString(),
        about: input.about,
        genre: calculatedGenres,
        description: input.description,
        image: input.image,
        location: input.location,
        members: input.members,
        userId: req.payload!.userId,
      }

      const existedBand = await prisma.bands.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!existedBand) {
        throw new Error(`Band with name ${bandInput.name} doesn't exist`)
      }

      const [tracksToUpdate, tracksToCreate]: [Tracks[], Tracks[]] = tracksInput.reduce(
        (result, track) => {
          const [updateArray, createArray] = result
          if (track.id) {
            updateArray.push(track)
          } else {
            createArray.push(track)
          }
          return result
        },
        [[], []] as [Tracks[], Tracks[]],
      )

      const bandResult = await prisma.bands.update({
        where: {
          id: input.id,
        },
        data: bandInput,
      })

      if (tracksToUpdate.length) {
        tracksToUpdate.map(async track => {
          return await prisma.tracks.update({
            where: {
              id: track.id,
            },
            data: {
              ...track,
              bandId: bandResult.id,
              year: moment(track.year).toISOString(),
              userId: req.payload!.userId,
            },
          })
        })
      }

      if (tracksToCreate.length) {
        tracksToCreate.map(async track => {
          return await prisma.tracks.create({
            data: {
              ...track,
              bandId: bandResult.id,
              year: moment(track.year).toISOString(),
              userId: req.payload!.userId,
            },
          })
        })
      }

      return await prisma.bands.findUnique({
        where: {
          id: bandResult.id,
        },
        include: {
          tracks: true,
        },
      })
    },
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
    createTracks: async (_: any, { input }: { input: CreateTracks }, { req }: MyContext) => {
      authenticate(req)
      await trackValidationSchema.validate(input)

      const { tracks: reqTracks, bandId } = input
      const existedBand = await prisma.bands.findFirst({
        where: {
          userId: req.payload!.userId,
        },
      })

      if (!existedBand) {
        throw new Error(`User has no bands`)
      }

      const tracks = reqTracks.map(async track => {
        return await prisma.tracks.create({
          data: {
            ...track,
            year: moment(track.year).toISOString(),
            userId: req.payload!.userId,
            bandId,
          },
        })
      })

      return tracks
    },
    updateTrack: async (_: any, { input }: { input: UpdateTrack }, { req }: MyContext) => {
      authenticate(req)
      await trackValidationSchema.validate(input)

      const { tracks: reqTracks, bandId, trackId } = input
      const existedBand = await prisma.bands.findFirst({
        where: {
          userId: req.payload!.userId,
        },
      })

      if (!existedBand) {
        throw new Error(`User has no bands`)
      }

      const tracks = reqTracks.map(async track => {
        return await prisma.tracks.update({
          where: {
            id: trackId,
          },
          data: {
            ...track,
            year: moment(track.year).toISOString(),
            userId: req.payload!.userId,
            bandId,
          },
        })
      })

      return tracks
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
  },
}

export default resolvers
