import { IUserDocument } from '@/features/users/User.model'

export type TUser = Pick<
  IUserDocument,
  'email' | 'username' | 'createdAt' | 'updatedAt'
> & {
  id: string
}

export class UserFactory {
  static formatUserResponse(user: IUserDocument): TUser {
    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
