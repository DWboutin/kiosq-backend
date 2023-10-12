import express from 'express'
import routes from '@/routes'

export const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
