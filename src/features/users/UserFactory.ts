import { IUserDocument } from '@/features/users/User.model'
import { ObjectId } from 'mongodb'

export type TCreatedUser = Pick<
  IUserDocument,
  'email' | 'username' | 'createdAt' | 'updatedAt'
> & {
  id: ObjectId
}

export class UserFactory {
  static formatCreationResponse(user: IUserDocument): TCreatedUser {
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
