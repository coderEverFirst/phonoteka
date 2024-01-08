import { gql } from '@apollo/client'

export const GET_ALL_TRACKS_QUERY = gql`
  query GetAllTracks(
    $sortBy: String
    $order: String
    $search: String
    $pageSize: Int
    $pageNumber: Int
  ) {
    getAllTracks(
      sortBy: $sortBy
      order: $order
      search: $search
      pageSize: $pageSize
      pageNumber: $pageNumber
    ) {
      allTracksCount
      tracks {
        id
        name
        createdAt
        year
        album
        genre
        url
        format
        bandId
        band {
          id
          name
          createdAt
          foundationDate
          genre
          members
          description
          about
          location
          image
        }
      }
    }
  }
`
export const GET_CHART_DATA_QUERY = gql`
  query GetChartData {
    getChartData {
      genreData {
        id
        value
        label
      }
      tracksAmount
    }
  }
`
export const GET_ALL_BANDS_QUERY = gql`
  query GetAllBands {
    getAllBands {
      id
      name
      location
    }
  }
`

export const GET_BAND_BY_ID_QUERY = gql`
  query GetBandById($id: Int) {
    getBandById(id: $id) {
      id
      name
      userId
      createdAt
      foundationDate
      genre
      members
      description
      about
      location
      image
      tracks {
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
  }
`
