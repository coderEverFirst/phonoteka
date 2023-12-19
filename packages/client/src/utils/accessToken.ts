import Cookies from 'js-cookie'

export const setAccessToken = (s: string) => {
  Cookies.set('token', s)
}

export const getAccessToken = () => {
  return Cookies.get('token')
}
