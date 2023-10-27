import { afterAll, afterEach, beforeAll, describe, expect, it } from 'bun:test'
import request from 'supertest'
import mongoose from 'mongoose'
import { createAppForRouter } from '@/tests/createAppForRouter'
import { productsRoutes } from '@/features/products/routes'

describe('features > products', () => {
  const { app, openServer, closeServer } = createAppForRouter('/products', productsRoutes)

  beforeAll(async () => {
    await openServer()
  })

  afterAll(async () => {
    await closeServer()
    mongoose.connection.dropDatabase()
  })

  describe('routes', () => {
    describe('GET /products', () => {
      it('should return good response', async (done) => {
        const response = await request(app).get('/products')

        expect(response.status).toBe(200)

        done()
      })
    })
  })
})
