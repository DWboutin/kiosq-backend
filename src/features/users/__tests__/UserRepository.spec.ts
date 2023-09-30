import { beforeEach, describe, expect, it } from 'bun:test'
import { MongoDBConnector } from '@/database/MongoDBConnector'
import { UserRepository } from '@/features/users/UserRepository'
import { IUser } from '@/features/users/User.model'
import { mongod } from '@/tests/setup'
import { InputValidationException } from '@/exceptions/InputValidationException'

describe('UserRepository', () => {
  it('should create a new user', async (done) => {
    const user: IUser = {
      email: 'test@test.com',
      username: 'usernametest',
      password: '!!test1234!!',
    }

    const mongodb = new MongoDBConnector()
    const userRepository = new UserRepository()
    const newUser = await userRepository.create(user)

    expect(newUser).toHaveProperty('_id')
    expect(newUser).toHaveProperty('email', user.email)
    expect(newUser).toHaveProperty('username', user.username)
    expect(await newUser.comparePassword(user.password)).toBe(true)

    await mongodb.disconnect()

    done()
  })

  it('should not create a new user', async (done) => {
    const user: IUser = {
      username: 'usernametest',
      password: '!!test1234!!',
    } as IUser

    const mongodb = new MongoDBConnector()
    const userRepository = new UserRepository()
    const creationFn = async () => {
      return await userRepository.create(user)
    }

    expect(creationFn).toThrow()
    await mongodb.disconnect()

    done()
  })
})
