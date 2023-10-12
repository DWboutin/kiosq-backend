export class ExceptionResponseFactory {
  static createFromException(exception: any) {
    return {
      code: exception.code,
      name: exception.name,
      message: exception.message,
      stack: process.env.NODE_ENV !== 'production' ? exception.stack : undefined,
      errors: exception.errors,
    }
  }
}
