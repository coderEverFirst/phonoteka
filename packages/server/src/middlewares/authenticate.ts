import { verify, JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

interface AuthRequest extends Request {
  payload?: string | JwtPayload
}

export const authenticate = (req: AuthRequest) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    throw new Error('Not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, process.env.SECRET!)
    req.payload = payload
  } catch (err) {
    console.log(err)
    throw new Error('Invalid auth token')
  }
}

export default authenticate
