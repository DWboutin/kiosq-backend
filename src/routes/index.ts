import { userRoutes } from '@/features/users/routes'
import { authenticatedRoute } from '@/middlewares/authenticatedRoute'
import express from 'express'

const routes = express.Router()

routes.use('/users', userRoutes)

routes.get('/', (req, res) => {
  res.send('Hello world!')
})

routes.get('/secret', authenticatedRoute, (req, res, next) => {
  res.json('Secret Data')
})

export default routes
