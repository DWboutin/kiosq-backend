import express from 'express'
import { UserController } from '@/features/users/UserController'

export const usersRoutes = express.Router()

usersRoutes.post('/', UserController.create)
usersRoutes.post('/login', UserController.authenticate)
usersRoutes.post('/refresh-token', UserController.refreshToken)
