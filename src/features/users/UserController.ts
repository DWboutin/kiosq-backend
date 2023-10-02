import { MongoDBConnector } from '@/database/MongoDBConnector'
import { ExceptionResponseFactory } from '@/factories/ExceptionResponseFactory'
import { IUser } from '@/features/users/User.model'
import { UserFactory } from '@/features/users/UserFactory'
import { UserRepository } from '@/features/users/UserRepository'
import { userCreationSchema } from '@/features/users/validationSchemas'
import { EnvVariableGetter } from '@/utils/EnvVariableGetter'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const dbUri = EnvVariableGetter.get('MONGODB_URI')
      const dbName = EnvVariableGetter.get('MONGODB_NAME')

      const mongodb = new MongoDBConnector(dbUri, dbName)
      const validator = new ZodValidator(userCreationSchema)
      validator.validate(req.body)

      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.create(req.body as IUser)
      const response = UserFactory.formatCreationResponse(user)

      await mongodb.disconnect()
      res.status(200).send(response)
      return
    } catch (err: any) {
      const errorResponse = ExceptionResponseFactory.createFromException(err)

      res.status(400).send(errorResponse)
      return
    }
  }
}
