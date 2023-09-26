import { describe, expect, it } from 'bun:test'
import { InputValidationException } from '@/exceptions/InputValidationException'

describe('InputValidationException', () => {
  it('should return the correct error', (done) => {
    const exception = new InputValidationException({ test: 'Test Error' })

    expect(exception.name).toBe('InputValidationException')
    expect(exception.message).toBe('Validation errors')
    expect(exception.errors).toEqual({ test: 'Test Error' })
    done()
  })
})
