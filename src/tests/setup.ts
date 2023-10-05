import { afterAll, afterEach, beforeAll, beforeEach, spyOn } from 'bun:test'
import { MongoMemoryServer } from 'mongodb-memory-server'

export let mongod: MongoMemoryServer

beforeAll(async () => {
  console.debug = () => {}

  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  process.env.MONGODB_URI = uri
})

afterAll(async () => {
  await mongod.stop({ doCleanup: false })
})
