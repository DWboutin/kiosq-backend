import { describe, expect, it } from 'bun:test'
import request from 'supertest'
import { app } from '@/server'

describe('features > users', () => {
  describe('routes', () => {
    describe('POST /users', () => {
      const user = {
        email: 'test@test.com',
        username: 'usernametest',
        password: '!!test1234!!',
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
        const response2 = await request(app).post('/users').send(user)
        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response2.status).toBe(400)
        expect(response2.body.message).toBe('Duplicate key error')

        done()
      })
    })
  })
})
