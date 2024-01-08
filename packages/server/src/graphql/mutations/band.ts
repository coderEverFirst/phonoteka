/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tracks, Bands } from '@prisma/client'
import moment from 'moment'
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'
import { bandValidationSchema } from '../../validations/bandValidationSchema'
import getUniqueGenres from '../../utils/getUniqueGenres'

type ExtendedBands = Bands & { tracks: Array<Tracks> }

const bandMutations = () => {
  return {
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
  }
}

export default bandMutations
