import express from 'express'
import { UserController } from '@/features/users/UserController'

export const userRoutes = express.Router()

userRoutes.post('/', UserController.create)
userRoutes.post('/login', UserController.authenticate)
userRoutes.post('/refresh-token', UserController.refreshToken)
