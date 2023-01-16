import Router from 'koa-router'

import auth from '../middleware/auth'
import { PG_UNIQUE_VIOLATION } from '../utils/pgErrorCodes'
import { CreateUserController } from './ddd/CreateUserController'
import { UserController, UserRepository } from './user.repository'

/** TODO change this to class UserController
 * ! change current impl
 * ? https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
 */
const createUserController = new CreateUserController(UserRepository)
const userController = new UserController(UserRepository)

export default new Router()
  .post('/test', createUserController.executeImpl)
  .post('/', registerUser)
  .post('/login', login)
  .get('/', auth, getCurrentUser)
  .put('/', auth, updateCurrentUser)

async function registerUser(ctx) {
  const {
    request: {
      body: { user },
    },
  } = ctx

  await handlePromise(userController.registerUser(user), ctx)
}

async function login(ctx) {
  let {
    request: {
      body: {
        user: { email, password },
      },
    },
  } = ctx

  await handlePromise(userController.loginUser(email, password), ctx)
}

async function getCurrentUser(ctx) {
  const {
    state: { user },
  } = ctx

  await handlePromise(userController.getCurrentUser(user), ctx)
}

async function updateCurrentUser(ctx) {
  const currentUser = ctx.state.user
  const {
    request: {
      body: { user },
    },
  } = ctx

  await handlePromise(userController.updateCurrentUser(currentUser, user), ctx)
}

function handlePromise(promise, ctx) {
  return promise
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      const errText =
        err.code === PG_UNIQUE_VIOLATION
          ? 'Duplicate username or email'
          : err.toString()
      ctx.body = { errors: { body: [errText] } }
    })
}
