import { describe, expect, it } from 'bun:test'
import { InputValidationException } from '@/exceptions/InputValidationException'
import { MongoDBRequestException } from '@/exceptions/MongoDBRequestException'

describe('MongoDBRequestException', () => {
  describe('Code: 11000', () => {
    it('should return the correct error', (done) => {
      const exception = new MongoDBRequestException({
        code: 11000,
        message: 'Duplicate key error',
      } as any)

      expect(exception.name).toBe('MongoDBRequestException')
      expect(exception.message).toBe('Duplicate key error')
      expect(exception.errors).toEqual({
        code: 11000,
        message: 'Duplicate key error',
      })
      done()
    })
  })
})
