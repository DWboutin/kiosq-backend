import { MongoAPIError, MongoServerError } from 'mongodb'

export class MongoDBRequestException extends Error {
  constructor(public errors: MongoServerError | MongoAPIError) {
    let message = `Undefined MongoDB error`

    if (errors.code === 11000) {
      message = `Duplicate key error`
    }

    if (errors instanceof MongoServerError) {
      message = errors.message
    }

    super(message)

    this.message = message
    this.name = 'MongoDBRequestException'

    Error.captureStackTrace(this, MongoDBRequestException)
  }
}
