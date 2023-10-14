import { usersRoutes } from '@/features/users/routes'
import { productsRoutes } from '@/features/products/routes'
import { authenticatedRoute } from '@/middlewares/authenticatedRoute'
import express from 'express'

const routes = express.Router()

routes.use('/users', usersRoutes)
routes.use('/kiosq/products', productsRoutes)

routes.get('/', (req, res) => {
  res.send('Hello world!')
})

routes.get('/secret', authenticatedRoute, (req, res, next) => {
  res.json('Secret Data')
})

export default routes
