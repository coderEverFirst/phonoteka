import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { getAccessToken, setAccessToken } from '../utils/accessToken'
import { onError } from '@apollo/client/link/error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { jwtDecode } from 'jwt-decode'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: 'http://localhost:4040/graphql',
  credentials: 'include',
})

const authLink = new TokenRefreshLink({
  accessTokenField: 'token',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()

    if (!token) {
      console.log('Token is undefined')
      return Promise.resolve(true)
    }

    try {
      const { exp } = jwtDecode(token)

      console.log('Current timestamp:', Date.now())
      console.log('Token expiration timestamp:', exp! * 1000)

      if (Date.now() >= exp! * 1000) {
        console.log('Token has expired')
        return Promise.resolve(false)
      } else {
        console.log('Token is still valid')
        return Promise.resolve(true)
      }
    } catch (e) {
      console.log('Error decoding token:', e)
      return Promise.resolve(false)
    }
  },
  fetchAccessToken: async () => {
    const response = await fetch('http://localhost:4040/refresh-token', {
      method: 'POST',
      credentials: 'include',
    })

    return response
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken)
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin')
    console.error(err)
  },
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors)
  console.log(networkError)
})

export const client = new ApolloClient({
  cache,
  link: from([authLink, errorLink, httpLink]),
})
