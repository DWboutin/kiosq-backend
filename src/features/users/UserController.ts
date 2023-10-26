import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { IUser } from '@/features/users/User.model'
import { TUser, UserFactory } from '@/features/users/UserFactory'
import { UserRepository } from '@/features/users/UserRepository'
import { userCreationSchema } from '@/features/users/validationSchemas'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'
import { generateJWTToken } from '@/utils/generateJWTTokens'
import { readJWTToken } from '@/utils/readJWTToken'
import { EnvVariableGetter } from '@/utils/EnvVariableGetter'

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const validator = new ZodValidator(userCreationSchema)
      validator.validate(req.body)

      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.create(req.body as IUser)
      const response = UserFactory.formatUserResponse(user)

      await mongodb.disconnect()

      res.status(200).send(response)
      return
    } catch (err: any) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).send(errorResponse)
      return
    }
  }

  static async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.login(email, password)

      if (user !== null) {
        const authenticatedUser = UserFactory.formatUserResponse(user)
        const tokenContent = {
          id: authenticatedUser.id,
        }

        const accessTokenSecret = EnvVariableGetter.get('JWT_ACCESS_SECRET')
        const accessTokenExpiration = EnvVariableGetter.get('JWT_ACCESS_EXPIRATION')
        const refreshTokenSecret = EnvVariableGetter.get('JWT_REFRESH_SECRET')
        const refreshTokenExpiration = EnvVariableGetter.get('JWT_REFRESH_EXPIRATION')
        const [accessToken, refreshToken] = await Promise.all([
          generateJWTToken(tokenContent, accessTokenExpiration, accessTokenSecret),
          generateJWTToken(tokenContent, refreshTokenExpiration, refreshTokenSecret),
        ])

        await userRepository.update(authenticatedUser.id, {
          refreshToken,
        })

        res.status(200).json({
          user: authenticatedUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
        return
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
        return
      }
    } catch (err) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).json({ ...errorResponse, message: 'Request error' })
      return
    }
  }

  static async refreshToken(req: Request, res: Response) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      res.status(400).json({ message: 'Authorization is missing' })
      return
    }

    try {
      const accessTokenSecret = EnvVariableGetter.get('JWT_ACCESS_SECRET')
      const accessTokenExpiration = EnvVariableGetter.get('JWT_ACCESS_EXPIRATION')
      const refreshTokenSecret = EnvVariableGetter.get('JWT_REFRESH_SECRET')

      const decodedToken = await readJWTToken(token, refreshTokenSecret)

      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.findById(decodedToken.id)

      if (user === null || user.refreshToken !== token) {
        res.status(401).json({ message: 'Invalid token' })
        return
      }

      const newTokenContent = {
        id: decodedToken.id,
      }

      const newAccessToken = await generateJWTToken(
        newTokenContent,
        accessTokenExpiration,
        accessTokenSecret,
      )

      res.status(200).json({ accessToken: newAccessToken })
      return
    } catch (err) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).json({ ...errorResponse, message: 'Request error' })
      return
    }
  }
}
