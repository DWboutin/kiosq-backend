import { afterAll, beforeAll, spyOn } from 'bun:test'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: MongoMemoryServer

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  process.env.MONGODB_URI = uri
})

afterAll(async () => {
  await mongod.stop()
})
