import { Env } from 'bun'
import { GuardAgainstEmptyEnvValue } from '@/guards/GuardAgainstEmptyEnvValue'

export class EnvVariableGetter {
  static get(name: keyof Env): string {
    GuardAgainstEmptyEnvValue.guard(name)

    return Bun.env[name] as string
  }
}
