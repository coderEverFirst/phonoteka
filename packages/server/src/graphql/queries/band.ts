/* eslint-disable @typescript-eslint/no-explicit-any */
import { MyContext } from 'index'
import authenticate from '../../middlewares/authenticate'
import prisma from '../../prisma/index'

const bandQueries = () => {
  return {
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
    getAllBands: (_: any, variables: null, { req }: MyContext) => {
      authenticate(req)
      return prisma.bands.findMany({
        where: {
          userId: req.payload!.userId,
        },
      })
    },
  }
}

export default bandQueries
