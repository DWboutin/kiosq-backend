import { userRoutes } from '@/features/users/routes'
import express from 'express'

const routes = express.Router()

routes.use('/users', userRoutes)

routes.get('/', (req, res) => {
  res.send('Hello world!')
})

export default routes
