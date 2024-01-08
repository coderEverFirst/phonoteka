import userQueries from '../../graphql/queries/user'
import bandQueries from '../../graphql/queries/band'
import trackQueries from '../../graphql/queries/track'
import userMutations from '../../graphql/mutations/user'
import bandMutations from '../../graphql/mutations/band'
import trackMutations from '../../graphql/mutations/track'

const resolvers = {
  Query: {
    ...userQueries(),
    ...bandQueries(),
    ...trackQueries(),
  },
  Mutation: {
    ...userMutations(),
    ...bandMutations(),
    ...trackMutations(),
  },
}

export default resolvers
