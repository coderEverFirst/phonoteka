import { makeVar } from '@apollo/client'

export const userInfoVar = makeVar({
  name: '',
  email: '',
  id: null,
  imgUrl: '',
  createdAt: null,
  updatedAt: null,
})

export const headerSearchValue = makeVar('')

export const shouldRefetchTracks = makeVar(false)
