import jwt from 'jsonwebtoken'

const generateToken = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.SECRET!, { expiresIn: '1h' })
  const refreshToken = jwt.sign({ userId }, process.env.SECRET_REFRESH!, {
    expiresIn: '7d',
  })
  return { token, refreshToken }
}

export default generateToken
