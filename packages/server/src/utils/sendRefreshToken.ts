import { Response } from 'express'

const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie('urt', refreshToken, { httpOnly: true })
}
export default sendRefreshToken
