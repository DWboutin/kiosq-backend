import { afterEach, beforeEach } from 'bun:test'
import { MongoMemoryServer } from 'mongodb-memory-server'

export let mongod: MongoMemoryServer

beforeEach(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  process.env.MONGODB_URI = uri
})

afterEach(async () => {
  await mongod.stop()
})
