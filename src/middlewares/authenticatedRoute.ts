import { EnvVariableGetter } from '@/utils/EnvVariableGetter'
import { readJWTToken } from '@/utils/readJWTToken'
import { NextFunction, Request, Response } from 'express'

export const authenticatedRoute = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(400).json({ message: 'Authorization header missing' })
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(400).json({ message: 'Token missing' })
    return
  }

  try {
    const accessTokenSecret = EnvVariableGetter.get('JWT_ACCESS_SECRET')
    const decodedToken = await readJWTToken(token, accessTokenSecret)
    const user = decodedToken as TUserToken
    req.user = user

    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
    return
  }
}
