import { gql } from '@apollo/client'

export const GET_USER_QUERY = gql`
  query getUserById {
    getUserById {
      id
      email
      imgUrl
      name
      createdAt
      updatedAt
    }
  }
`
