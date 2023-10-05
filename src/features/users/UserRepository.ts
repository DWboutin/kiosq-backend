import { IUser, IUserDocument, UserModel } from '@/features/users/User.model'
import { WithDB } from '@/utils/decorators/WithDB'

export interface IUserRepository extends IRepository {
  create(user: IUser): Promise<IUser>
  findAll(): Promise<IUser[]>
  findById(id: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  update(id: string, data: Partial<IUser>): Promise<IUser | null>
  delete(id: string): Promise<IUser | null>
  login(email: string, password: string): Promise<IUser | null>
}

@WithDB
export class UserRepository implements IRepository {
  constructor(private dbConnector: DBConnector) {}

  public async create(user: IUser): Promise<IUserDocument> {
    const newUser = new UserModel({
      email: user.email,
      username: user.username,
      password: user.password,
    })

    return await newUser.save()
  }

  public async findAll(): Promise<IUserDocument[]> {
    return await UserModel.find()
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    return await UserModel.findById(id)
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email })
  }

  public async update(
    id: string,
    data: Partial<IUser>,
  ): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true })
  }

  public async delete(id: string): Promise<IUserDocument | null> {
    return await UserModel.findByIdAndDelete(id)
  }

  public async login(
    email: string,
    password: string,
  ): Promise<IUserDocument | null> {
    const user = await UserModel.findOne({ email })

    if (!user) return null

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) return null

    return user
  }
}
