import { Document, Model, Schema, model, models } from 'mongoose'
import Bun from 'bun'

export interface IUser {
  email: string
  username: string
  password: string
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

export const usernameRegexp =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/

export const usernameRegexpError =
  'Username invalid, it should contain 8-20 alphanumeric characters and be unique!'

export const passwordRegexp =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

export const passwordRegexpError =
  'Password invalid, it should contain at least one letter, one number and one special character'

type IUserMethods = {
  isModified(arg0: string): unknown
  comparePassword(password: string): Promise<boolean>
}

export type TUserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, TUserModel, IUserMethods>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    match: [usernameRegexp, usernameRegexpError],
  },
  password: {
    type: String,
    required: true,
    minlength: [12, 'Password should be at least 12 characters long'],
    maxlength: [32, 'Password should not exceed 32 characters long'],
    match: [passwordRegexp, passwordRegexpError],
  },
})

userSchema.pre('save', async function (this: IUserDocument, next) {
  const user = this

  if (!user.isModified('password')) return next()

  const hash = await Bun.password.hash(user.password, {
    algorithm: 'bcrypt',
    cost: 4,
  })

  user.password = hash
  next()
})

userSchema.method('comparePassword', async function (password: string) {
  const user = this as IUserDocument

  return await Bun.password.verify(password, user.password)
})

export const UserModel = model<IUser, TUserModel>('User', userSchema)
