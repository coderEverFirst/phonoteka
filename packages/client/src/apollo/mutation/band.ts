import { gql } from '@apollo/client'

export const CREATE_BAND_MUTATION = gql`
  mutation CreateBand($input: BandInput!) {
    createBand(input: $input) {
      tracks {
        id
        year
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
export const CREATE_TRACKS_MUTATION = gql`
  mutation CreateTracks($input: CreateTracksInput!) {
    createTracks(input: $input) {
      id
      name
      userId
      createdAt
      year
      album
      genre
      url
      format
      bandId
    }
  }
`
