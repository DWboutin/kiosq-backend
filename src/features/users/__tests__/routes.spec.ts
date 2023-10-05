import { afterAll, describe, expect, it } from 'bun:test'
import request from 'supertest'
import { app } from '@/server'
import mongoose from 'mongoose'

describe('features > users', () => {
  describe('routes', () => {
    afterAll(() => {
      mongoose.connection.dropDatabase()
    })

    describe('POST /users', () => {
      const user = {
        email: 'ROUTE-test@test.com',
        username: 'ROUTEusername',
        password: '!!ROUTEtest1234!!',
      }

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
        expect(response.body.message).toBe('Duplicate key error')

        done()
      })
    })
  })
})
