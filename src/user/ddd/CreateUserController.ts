import * as Koa from 'koa'
import { BaseController } from './BaseController'
import { UserRepository } from '../user.repository'
import { Result } from '../../utils/result'
import { User } from './User'
import { prototype } from 'events'

export class CreateUserController extends BaseController {
  private userRepo: any

  constructor(userRepo: any) {
    super()
    this.userRepo = userRepo
  }

  public async executeImpl(ctx: Koa.Context): Promise<void | any> {
    try {
      // const { username, password, email } = req.body;
      // const usernameOrError: Result<Username> = Username.create(username);
      // const passwordOrError: Result<Password> = Password.create(password);
      // const emailOrError: Result<Email> = Email.create(email);
      const result = Result.combine([
        // usernameOrError, passwordOrError, emailOrError
      ])

      if (result.isFailure) {
        return super.clientError(ctx, result.error)
      }

      const username = 'username'
      const password = 'password'
      const email = 'email'

      const userOrError: Result<User> = User.createUser(
        email,
        username,
        password
      )

      if (userOrError.isFailure) {
        super.fail(ctx, userOrError.error)
      }

      let user: User = userOrError.getValue()
      // user = { user: { username, password, email } }

      let newUser = UserRepository.create({ ...user })
      let out = await UserRepository.save(newUser)
      // this undefined
      console.log({ out })

      return super.ok<any>(ctx)
    } catch (err) {
      super.fail(ctx, err.toString())
    }
  }
}
