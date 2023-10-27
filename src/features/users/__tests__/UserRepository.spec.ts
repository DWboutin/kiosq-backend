import { describe, expect, it } from 'bun:test'
import { MongoDBConnector } from '@/database/MongoDBConnector'
import { UserRepository } from '@/features/users/UserRepository'
import { IUser, IUserDocument } from '@/features/users/User.model'
import { ObjectId } from 'mongodb'

describe('UserRepository', () => {
  let CREATED_USER: IUserDocument
  const USER: IUser = {
    email: 'UR-test@test.com',
    username: 'URusername',
    password: '!!test1234!!',
  }
  const NEW_USERNAME = 'URusername2'

  describe('create', () => {
    it('should create a new user', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const newUser = await userRepository.create(USER)

      expect(newUser).toHaveProperty('_id')
      expect(newUser).toHaveProperty('email', USER.email)
      expect(newUser).toHaveProperty('username', USER.username)
      expect(await newUser.comparePassword(USER.password)).toBe(true)

      CREATED_USER = newUser

      done()
    })

    it('should not create a new user with the same email address', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const creationFn = async () => {
        return await userRepository.create(USER)
      }

      expect(creationFn).toThrow('Duplicate key error')

      done()
    })
  })

  describe('findAll', () => {
    it('should return all users', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const users = await userRepository.findAll()

      expect(users.length).toBe(1)
      expect(users[0]).toHaveProperty('_id')
      expect(users[0]).toHaveProperty('email', USER.email)
      expect(users[0]).toHaveProperty('username', USER.username)
      expect(users[0]).toHaveProperty('password')
      expect(users[0]).toHaveProperty('createdAt')
      expect(users[0]).toHaveProperty('updatedAt')

      done()
    })
  })

  describe('findById', () => {
    it("should find a user by it's id", async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.findById(CREATED_USER._id)

      expect(user).toHaveProperty('_id', CREATED_USER._id)
      expect(user).toHaveProperty('email', USER.email)
      expect(user).toHaveProperty('username', USER.username)
      expect(user).toHaveProperty('password')
      expect(user).toHaveProperty('createdAt', CREATED_USER.createdAt)
      expect(user).toHaveProperty('updatedAt', CREATED_USER.updatedAt)

      done()
    })

    it('should return null when trying to find a user by an nonexistent id', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.findById(new ObjectId().toString())

      expect(user).toBe(null)

      done()
    })
  })

  describe('update', () => {
    it("should update the user's username", async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = (await userRepository.update(CREATED_USER._id, {
        username: NEW_USERNAME,
      })) as IUserDocument

      expect(user).toHaveProperty('_id', CREATED_USER._id)
      expect(user).toHaveProperty('email', USER.email)
      expect(user).toHaveProperty('username', NEW_USERNAME)
      expect(user).toHaveProperty('password')
      expect(user).toHaveProperty('createdAt', CREATED_USER.createdAt)
      expect(user).toHaveProperty('updatedAt')
      expect(user.updatedAt).not.toBe(CREATED_USER.updatedAt)

      done()
    })
  })

  describe('login', () => {
    it('should return the user from the email and password', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.login(USER.email, USER.password)

      expect(user).toHaveProperty('_id', CREATED_USER._id)
      expect(user).toHaveProperty('email', USER.email)
      expect(user).toHaveProperty('username', NEW_USERNAME)

      done()
    })

    it('should return null when user log in with a wrong password', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.login(USER.email, 'wrong password')

      expect(user).toBe(null)

      done()
    })

    it('should return null when user log in with a wrong email', async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.login('wrong email', USER.password)

      expect(user).toBe(null)

      done()
    })
  })

  describe('delete', () => {
    it("should delete a user from it's id and return the deleted user", async (done) => {
      const mongodb = new MongoDBConnector()
      const userRepository = new UserRepository(mongodb)
      const user = await userRepository.delete(CREATED_USER._id)
      const users = await userRepository.findAll()

      expect(user).toHaveProperty('_id', CREATED_USER._id)
      expect(users.length).toBe(0)

      done()
    })
  })
})
