import express, { Router } from 'express'

export const createAppForRouter = (basePath: string, routes: Router) => {
  const app = express()
  const port = 8080

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(basePath, routes)

  const server = app.listen(port)

  return { app, server }
}
