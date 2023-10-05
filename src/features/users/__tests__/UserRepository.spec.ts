import { describe, expect, it } from 'bun:test'
import { MongoDBConnector } from '@/database/MongoDBConnector'
import { UserRepository } from '@/features/users/UserRepository'
import { IUser } from '@/features/users/User.model'
import { EnvVariableGetter } from '@/utils/EnvVariableGetter'

describe('features > users', () => {
  describe('UserRepository', () => {
    it('should create a new user', async (done) => {
      const user: IUser = {
        email: 'UR-test@test.com',
        username: 'URusernametest',
        password: '!!test1234!!',
      }

      const dbUri = EnvVariableGetter.get('MONGODB_URI')

      const mongodb = new MongoDBConnector(
        dbUri,
        process.env.MONGODB_NAME as string,
      )
      const userRepository = new UserRepository(mongodb)
      const newUser = await userRepository.create(user)

      expect(newUser).toHaveProperty('_id')
      expect(newUser).toHaveProperty('email', user.email)
      expect(newUser).toHaveProperty('username', user.username)
      expect(await newUser.comparePassword(user.password)).toBe(true)

      await mongodb.disconnect()

      done()
    })

    it('should not create a new user with the same email address', async (done) => {
      const user: IUser = {
        email: 'UR-test@test.com',
        username: 'URusernametest2',
        password: '!!test1234!!',
      }

      const dbUri = EnvVariableGetter.get('MONGODB_URI')
      const mongodb = new MongoDBConnector(
        dbUri,
        process.env.MONGODB_NAME as string,
      )
      const userRepository = new UserRepository(mongodb)
      const creationFn = async () => {
        return await userRepository.create(user)
      }

      expect(creationFn).toThrow('Duplicate key error')

      done()
    })
  })
})
