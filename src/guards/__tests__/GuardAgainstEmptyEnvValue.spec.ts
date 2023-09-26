import { describe, expect, it } from 'bun:test'
import { GuardAgainstEmptyEnvValue } from '@/guards/GuardAgainstEmptyEnvValue'
import { MissingEnvValueException } from '@/exceptions/MissingEnvValueException'

describe('GuardAgainstEmptyEnvValue', () => {
  it('should not throw an error', (done) => {
    process.env.TEST = 'test'

    expect(() => GuardAgainstEmptyEnvValue.guard('TEST')).not.toThrow()
    done()
  })

  it('should throw an error', (done) => {
    expect(() => GuardAgainstEmptyEnvValue.guard('TEST2')).toThrow(
      new MissingEnvValueException('TEST2'),
    )
    done()
  })
})
