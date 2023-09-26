import { describe, expect, it } from 'bun:test'
import { MissingEnvValueException } from '@/exceptions/MissingEnvValueException'

describe('MissingEnvValueException', () => {
  it('should return the correct error', (done) => {
    process.env.NODE_ENV = 'test'
    const valueName = 'TEST'

    expect(new MissingEnvValueException(valueName).message).toBe(
      `Undefined "Bun.env.${valueName}" environment variable, please set it in .env.${process.env.NODE_ENV} file`,
    )
    done()
  })
})
