import express, { Router } from 'express'

export const createAppForRouter = (basePath: string, routes: Router) => {
  const app = express()
  const port = 8080
  let server: any

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(basePath, routes)

  const openServer = async () => {
    return new Promise<void>((resolve) => {
      server = app.listen(port, () => {
        console.log('Server listening on port', port)
      })
      resolve()
    })
  }

  const closeServer = () => {
    return new Promise<void>((resolve) => {
      server.close(() => {
        console.log('Server closed')
        resolve()
      })
    })
  }

  return { app, openServer, closeServer }
}
