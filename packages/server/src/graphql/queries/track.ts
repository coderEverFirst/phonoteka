/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client'
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'
type SortOrder = 'asc' | 'desc'

const trackQueries = () => {
  return {
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
  }
}

export default trackQueries
