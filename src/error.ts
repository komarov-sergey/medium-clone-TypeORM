export class AuthError extends Error {
  public code;
  public status;

  constructor(data) {
    super(data.description);
    this.code = data.code || "UNAUTHORIZED_ERROR";
    this.status = 401;
  }
}
