import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
      user {
        id
        email
        name
      }
    }
  }
`

export const SIGN_UP_MUTATION = gql`
  mutation RegisterMutation(
    $email: String!
    $username: String!
    $password: String!
    $rePassword: String!
  ) {
    register(email: $email, username: $username, password: $password, rePassword: $rePassword) {
      token
      refreshToken
      user {
        id
        email
        name
      }
    }
  }
`
