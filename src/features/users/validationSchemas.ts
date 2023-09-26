import {
  passwordRegexp,
  passwordRegexpError,
  usernameRegexp,
  usernameRegexpError,
} from '@/features/users/User.model'
import { z } from 'zod'

export const userCreationSchema = z.object({
  email: z.string().min(1, { message: 'No input' }).email('Invalid email'),
  username: z.string().regex(usernameRegexp, usernameRegexpError),
  password: z
    .string()
    .min(12)
    .max(32)
    .regex(passwordRegexp, passwordRegexpError),
})
