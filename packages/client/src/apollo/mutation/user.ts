import { gql } from '@apollo/client'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UserInput!) {
    updateUser(input: $input) {
      id
      email
      name
      imgUrl
      createdAt
      updatedAt
    }
  }
`
