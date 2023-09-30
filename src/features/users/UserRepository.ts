import { MongoDBRequestException } from '@/exceptions/MongoDBRequestException'
import { IUser, IUserDocument, UserModel } from '@/features/users/User.model'

export interface IUserRepository extends IRepository {
  create(user: IUser): Promise<IUser>
}

export class UserRepository implements IRepository {
  public async create(user: IUser): Promise<IUserDocument> {
    try {
      const newUser = new UserModel({
        email: user.email,
        username: user.username,
        password: user.password,
      })

      return await newUser.save()
    } catch (err: any) {
      console.log(err)
      throw new MongoDBRequestException(err)
    }
  }
}
