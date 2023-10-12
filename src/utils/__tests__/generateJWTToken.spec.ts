import { generateJWTToken } from '@/utils/generateJWTTokens'
import { readJWTToken } from '@/utils/readJWTToken'
import { describe, expect, it } from 'bun:test'

describe('utils', () => {
  describe('generateJWTToken / readJWTToken', () => {
    it('should generate a valid JWT token', async (done) => {
      const token = await generateJWTToken({ data: 'info' }, '1m', 'secret')
      const decoded = await readJWTToken(token, 'secret')

      expect(decoded).toHaveProperty('exp')
      expect(decoded).toHaveProperty('data', 'info')

      done()
    })

    it('should generate a valid JWT token', async (done) => {
      const token = await generateJWTToken({ data: 'info' }, '0.1s', 'secret')

      setTimeout(() => {
        expect(async () => await readJWTToken(token, 'secret')).toThrow(
          '"exp" claim timestamp check failed',
        )

        done()
      }, 110)
    })
  })
})
