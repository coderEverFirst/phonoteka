import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { join } from 'node:path'
import { ApolloServer, GraphQLRequestContext, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import resolvers from './graphql/resolvers'

const typeDefs = loadSchemaSync(join(__dirname, 'graphql/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

dotenv.config()
const app: Application = express()
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

const setupServer = async () => {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [loggerPlugin],
  })
  await apolloServer.start()
  app.use('/graphql', expressMiddleware(apolloServer))

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
  })

  app.listen(port, () => {
    console.log(`Server listens at http://localhost:${port}`)
    console.log(`Graphql server available at http://localhost:${port}/graphql`)
  })
}

setupServer()
