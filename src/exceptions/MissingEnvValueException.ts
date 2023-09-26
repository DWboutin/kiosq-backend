import { Env } from 'bun'

export class MissingEnvValueException extends Error {
  constructor(valueName: keyof Env) {
    const message = `Undefined "Bun.env.${valueName}" environment variable, please set it in .env.${Bun.env.NODE_ENV} file`

    super(message)

    this.message = message
    this.name = 'MissingEnvValueException'

    Error.captureStackTrace(this, MissingEnvValueException)
  }
}
