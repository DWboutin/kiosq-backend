import { Env } from 'bun'
import { MissingEnvValueException } from '@/exceptions/MissingEnvValueException'

export class GuardAgainstEmptyEnvValue {
  static guard(valueName: keyof Env) {
    if (typeof Bun.env[valueName] === 'undefined') {
      throw new MissingEnvValueException(valueName)
    }
  }
}
