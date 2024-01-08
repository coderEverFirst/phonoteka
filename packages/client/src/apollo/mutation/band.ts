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

export const UPDATE_BAND_MUTATION = gql`
  mutation UpdateBand($input: UpdateBandInput!) {
    updateBand(input: $input) {
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
export const UPDATE_TRACK_MUTATION = gql`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
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
