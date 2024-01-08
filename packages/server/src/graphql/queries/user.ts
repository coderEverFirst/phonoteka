/* eslint-disable @typescript-eslint/no-explicit-any */
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'

const userQueries = () => {
  return {
    getUserById: (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      return prisma.users.findUnique({
        where: {
          id: req.payload?.userId,
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
  }
}

export default userQueries
