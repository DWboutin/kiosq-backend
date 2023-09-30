export class ExceptionResponseFactory {
  static createFromException(exception: any) {
    return {
      code: exception.code,
      name: exception.name,
      message: exception.message,
      stack: exception.stack,
      errors: exception.errors,
    }
  }
}
