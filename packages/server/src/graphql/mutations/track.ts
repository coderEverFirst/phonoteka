/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tracks } from '@prisma/client'
import moment from 'moment'
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'
import { trackValidationSchema } from '../../validations/trackValidationSchema'

interface CreateTracks {
  bandId: number
  tracks: Tracks[]
}

interface UpdateTrack {
  bandId: number
  trackId: number
  tracks: Tracks[]
}

const trackMutations = () => {
  return {
    deleteTracks: async (_: any, { ids }: { ids: number[] }, { req }: MyContext) => {
      authenticate(req)
      return await prisma.tracks.deleteMany({
        where: {
          id: {
            in: ids,
          },
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
  }
}

export default trackMutations
