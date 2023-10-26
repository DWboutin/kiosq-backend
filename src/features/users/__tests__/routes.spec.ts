import { afterAll, afterEach, describe, expect, it } from 'bun:test'
import request from 'supertest'
import mongoose from 'mongoose'
import { EnvVariableGetter } from '@/utils/EnvVariableGetter'
import { generateJWTToken } from '@/utils/generateJWTTokens'
import { ObjectId } from 'mongodb'
import { createAppForRouter } from '@/tests/createAppForRouter'
import { usersRoutes } from '@/features/users/routes'

describe('features > users', () => {
  const { app, server } = createAppForRouter('/users', usersRoutes)

  afterEach(() => {
    server.close()
  })

  describe('routes', () => {
    const user = {
      email: 'ROUTE-test@test.com',
      username: 'ROUTEusername',
      password: '!!ROUTEtest1234!!',
    }

    afterAll(() => {
      mongoose.connection.dropDatabase()
    })

    describe('POST /users', () => {
      it('should return good response', async (done) => {
        const response = await request(app).post('/users').send(user)

        expect(response.body).toHaveProperty('id')
        expect(response.status).toBe(200)
        expect(response.body.email).toBe(user.email)
        expect(response.body.username).toBe(user.username)
        expect(response.body).not.toHaveProperty('password')

        done()
      })

      it('should return error response', async (done) => {
        const response = await request(app).post('/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'Duplicate key error')

        done()
      })
    })

    describe('POST /users/login', () => {
      it('should return good response', async (done) => {
        const response = await request(app).post('/users/login').send({
          email: user.email,
          password: user.password,
        })

        expect(response.body).toHaveProperty('user')
        expect(response.body).toHaveProperty('accessToken')
        expect(response.body).toHaveProperty('refreshToken')

        done()
      })

      it('should return error response on bad credentials', async (done) => {
        const response = await request(app).post('/users/login').send({
          email: 'abcd',
          password: 'abcd',
        })
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message', 'Invalid credentials')

        done()
      })
    })

    describe('POST /users/refresh-token', async () => {
      it('should return good response', async (done) => {
        const loginResponse = await request(app).post('/users/login').send({
          email: user.email,
          password: user.password,
        })
        const response = await request(app)
          .post('/users/refresh-token')
          .set('Authorization', `Bearer ${loginResponse.body.refreshToken}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('accessToken')

        done()
      })

      it('should return error response on an invalid token', async (done) => {
        const response = await request(app)
          .post('/users/refresh-token')
          .set('Authorization', `Bearer invalid-token`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'Request error')
        expect(response.body).toHaveProperty('code', 'ERR_JWS_INVALID')
        expect(response.body).toHaveProperty('name', 'JWSInvalid')
        expect(response.body).toHaveProperty('stack')

        done()
      })

      it('should return error response on an invalid token user id', async (done) => {
        const refreshTokenSecret = EnvVariableGetter.get('JWT_REFRESH_SECRET')
        const invalidRefreshToken = await generateJWTToken(
          { id: new ObjectId().toString() },
          '1h',
          refreshTokenSecret,
        )
        const response = await request(app)
          .post('/users/refresh-token')
          .set('Authorization', `Bearer ${invalidRefreshToken}`)

        expect(response.status).toBe(401)
        expect(response.body.message).toBe('Invalid token')

        done()
      })

      it('should return error response on missing token', async (done) => {
        const response = await request(app).post('/users/refresh-token')

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Authorization is missing')

        done()
      })
    })
  })
})
