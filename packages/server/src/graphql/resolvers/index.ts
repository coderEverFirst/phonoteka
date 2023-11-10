/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, Band } from '@prisma/client'
const prisma = new PrismaClient()

const resolvers = {
  Query: {
    getBandById: (_: any, { id }: { id: number }) => {
      return prisma.band.findUnique({
        where: {
          id,
        },
      })
    },
    getAllBands: () => {
      return prisma.band.findMany()
    },
  },
  Mutation: {
    createBand: async (_: any, { input }: { input: Band }) => {
      return prisma.band.create({
        data: input,
      })
    },
  },
}

export default resolvers
