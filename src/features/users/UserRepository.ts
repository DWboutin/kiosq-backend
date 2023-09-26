import { MongoDBConnector } from '@/database/MongoDBConnector'
import { MongoDBRequestException } from '@/exceptions/MongoDBRequestException'
import { IUser, UserModel } from '@/features/users/User.model'

export interface IUserRepository extends IRepository {
  create(user: IUser): Promise<IUser>
}

export class UserRepository implements IRepository {
  constructor() {
    new MongoDBConnector()
  }

  public async create(user: IUser): Promise<IUser> {
    try {
      const newUser = new UserModel({
        email: user.email,
        username: user.username,
        password: user.password,
      })

      return await newUser.save()
    } catch (err: any) {
      throw new MongoDBRequestException(err)
    }
  }
}
