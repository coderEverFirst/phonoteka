import { makeVar } from '@apollo/client'

export const userInfoVar = makeVar({
  name: '',
  email: '',
  id: null,
  avatarImg: null,
  createdAt: null,
  updatedAt: null,
})
