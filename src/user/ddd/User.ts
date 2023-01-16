import { Result } from '../../utils/result'

export class User {
  public email: string
  public username: string
  public password: string

  private constructor(email: string, username: string, password: string) {
    this.email = email
    this.username = username
    this.password = password
  }

  public static createUser(
    email: string,
    username: string,
    password: string
  ): Result<User> {
    if (!email) {
      return Result.fail<User>('Email is invalid')
    }

    if (!!username === false && username.length > 1 && username.length < 50) {
      return Result.fail<User>('First name is invalid')
    }

    if (!!password === false && password.length > 1 && password.length < 50) {
      return Result.fail<User>('Password is invalid')
    }

    return Result.ok<User>(new User(email, username, password))
  }
}
