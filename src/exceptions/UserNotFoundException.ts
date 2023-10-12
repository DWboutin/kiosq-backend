export class UserNotFoundException extends Error {
  constructor(message?: string) {
    if (typeof message === 'undefined') {
      message = 'User not found'
    }

    super(message)

    this.message = message
    this.name = 'UserNotFoundException'

    Error.captureStackTrace(this, UserNotFoundException)
  }
}
