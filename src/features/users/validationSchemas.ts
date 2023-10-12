import {
  passwordRegexp,
  passwordRegexpError,
  usernameRegexp,
  usernameRegexpError,
} from '@/features/users/User.model'
import { z } from 'zod'

const usernameValidator = z.string().regex(usernameRegexp, usernameRegexpError)
const passwordValidator = z
  .string()
  .min(12)
  .max(32)
  .regex(passwordRegexp, passwordRegexpError)

export const userCreationSchema = z.object({
  email: z.string().min(1, { message: 'No input' }).email('Invalid email'),
  username: usernameValidator,
  password: passwordValidator,
})

export const userLoginSchema = z.object({
  username: usernameValidator,
  password: passwordValidator,
})

export const userRefreshTokenSchema = z.object({
  id: z.string(),
})
