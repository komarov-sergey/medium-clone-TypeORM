export class AuthError extends Error {
  public code
  public status

  constructor(data) {
    super(data.description)
    this.code = data.code || 'UNAUTHORIZED_ERROR'
    this.status = 401
  }
}
export class UnexpectedError extends Error {
  public code
  public status

  constructor(data) {
    super(data)
    this.code = data.code || 'UNEXPECTED_ERROR'
    this.status = 422
  }
}
export class DatabaseError extends Error {
  public code
  public status

  constructor(data) {
    super(data)
    this.code = data.code || 'DATABASE_ERROR'
    this.status = 500
  }
}
