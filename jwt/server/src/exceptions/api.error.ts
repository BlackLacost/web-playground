export class ApiError extends Error {
  status: number
  errors: unknown[]
  message: string

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequet(message: string, errors: unknown[] = []) {
    return new ApiError(400, message, errors)
  }
}
