import * as service from './user.service'
import { PG_UNIQUE_VIOLATION } from '../utils/pgErrorCodes'

export async function registerUser(ctx) {
  const {
    request: {
      body: { user },
    },
  } = ctx

  await service
    .registerUser(user)
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

export async function login(ctx) {
  let {
    request: {
      body: {
        user: { email, password },
      },
    },
  } = ctx

  await service
    .login(email, password)
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}

export function getCurrentUser(ctx) {
  const {
    state: { user },
  } = ctx

  service
    .getCurrentUser(user)
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}

export async function updateCurrentUser(ctx) {
  const currentUser = ctx.state.user
  const {
    request: {
      body: { user },
    },
  } = ctx

  await service
    .updateCurrentUser(currentUser, user)
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}
