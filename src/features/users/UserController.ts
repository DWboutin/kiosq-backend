import { IUser } from '@/features/users/User.model'
import { UserRepository } from '@/features/users/UserRepository'
import { userCreationSchema } from '@/features/users/validationSchemas'
import { ZodValidator } from '@/validators/ZodValidator'
import { Request, Response } from 'express'

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const validator = new ZodValidator(userCreationSchema)
      validator.validate(req.body)

      const userRepository = new UserRepository()
      const user = await userRepository.create(req.body as IUser)

      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
      return
    }
  }
}
