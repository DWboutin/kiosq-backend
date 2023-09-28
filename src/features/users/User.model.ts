import { Schema, model, models } from 'mongoose'
import Bun from 'bun'

export interface IUser {
  email: string
  username: string
  password: string
}

export const usernameRegexp =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/

export const usernameRegexpError =
  'Username invalid, it should contain 8-20 alphanumeric characters and be unique!'

export const passwordRegexp =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

export const passwordRegexpError =
  'Password invalid, it should contain at least one letter, one number and one special character'

interface IUserModel extends IUser {
  isModified(arg0: string): unknown
  comparePassword(password: string): Promise<boolean>
}

const UserSchema = new Schema<IUserModel>({
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

UserSchema.pre<IUserModel>('save', async function (this: IUserModel, next) {
  const user = this

  if (!user.isModified('password')) return next()

  const hash = await Bun.password.hash(user.password)

  user.password = hash
  next()
})

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const hash = await Bun.password.hash(password)

  return await Bun.password.verify(hash, this.password)
}

export const UserModel = models.User || model<IUserModel>('User', UserSchema)
