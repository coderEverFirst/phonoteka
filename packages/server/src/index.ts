import express, { Application, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import cors from 'cors'
import dotenv from 'dotenv'
import { join } from 'node:path'
import {
  ApolloServer,
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse,
  BaseContext,
} from '@apollo/server'
import { GraphQLError } from 'graphql'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { expressMiddleware } from '@apollo/server/express4'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import resolvers from './graphql/resolvers'
import prisma from './prisma/index'
import generateToken from './utils/generateToken'
import sendRefreshToken from './utils/sendRefreshToken'

export interface CustomJwtPayload extends JwtPayload {
  userId: number
}
export interface MyContext extends BaseContext {
  req: Request & { payload?: CustomJwtPayload }
  res: Response
}

const typeDefs = loadSchemaSync(join(__dirname, 'graphql/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

dotenv.config()
const port = process.env.PORT || 4040

const loggerPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: GraphQLRequestContext<BaseContext>) {
    console.log('Request started! Query:\n' + requestContext.request.query)

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart() {
        console.log('Parsing started!')
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart() {
        console.log('Validation started!')
      },
    }
  },
}

const responsePlugin = {
  async requestDidStart() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async willSendResponse(requestContext: { response: any }) {
        const { response } = requestContext
      },
    }
  },
}

const setupServer = async () => {
  const app: Application = express()
  app.use(
    cors<cors.CorsRequest>({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())

  const apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [loggerPlugin, responsePlugin],
  })

  await apolloServer.start()

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
  })

  app.post('/refresh-token', async (req: Request, res: Response) => {
    const token = req.cookies.urt
    if (!token) {
      return res.send({ ok: false, token: '' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any = null
    try {
      payload = jwt.verify(token, process.env.SECRET_REFRESH!)
    } catch (error) {
      console.log('error', error)
      return res.send({ ok: false, token: '' })
    }

    const user = await prisma.users.findUnique({ where: { id: payload.userId } })
    if (!user) {
      return res.send({ ok: false, token: '' })
    }

    const { token: accessToken, refreshToken } = generateToken(user.id)
    sendRefreshToken(res, refreshToken)

    return res.send({ ok: true, token: accessToken })
  })

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        return { req, res }
      },
    }),
  )

  app.listen(port, () => {
    console.log(`Server listens at http://localhost:${port}`)
    console.log(`Graphql server available at http://localhost:${port}/graphql`)
  })
}

setupServer()
