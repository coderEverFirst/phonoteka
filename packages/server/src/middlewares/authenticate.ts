import { verify } from 'jsonwebtoken'
import { Request } from 'express'
import { CustomJwtPayload } from 'index'

interface AuthRequest extends Request {
  payload?: string | CustomJwtPayload
}

export const authenticate = (req: AuthRequest) => {
  const token = req.cookies.token

  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const payload = verify(token, process.env.SECRET!) as CustomJwtPayload
    console.log('payloadpayloadpayload', payload)

    req.payload = payload
  } catch (err) {
    console.log(err)
    throw new Error('Invalid auth token')
  }
}

export default authenticate
