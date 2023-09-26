import { describe, it } from 'bun:test'
import request from 'supertest'
import { app } from '@/server'

describe('index', () => {
  it('should return "Hello world!"', (done) => {
    request(app).get('/').expect(200).expect('Hello world!', done)
  })
})
