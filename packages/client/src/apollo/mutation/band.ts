import { gql } from '@apollo/client'

export const CREATE_BAND_MUTATION = gql`
  mutation CreateBand($input: BandInput!) {
    createBand(input: $input) {
      tracks {
        id
        year
        description
        genre
        url
        format
      }
      location
      image
      about
      members
      description
      genre
      foundationDate
      name
      id
    }
  }
`
