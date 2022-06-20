import * as service from './user.service'
import { PG_UNIQUE_VIOLATION } from '../utils/pgErrorCodes'

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

export async function registerUser(ctx) {
  const {
    request: {
      body: { user },
    },
  } = ctx

  await handlePromise(service.registerUser(user), ctx)
}

export async function login(ctx) {
  let {
    request: {
      body: {
        user: { email, password },
      },
    },
  } = ctx

  await handlePromise(service.login(email, password), ctx)
}

export function getCurrentUser(ctx) {
  const {
    state: { user },
  } = ctx

  handlePromise(service.getCurrentUser(user), ctx)
}

export async function updateCurrentUser(ctx) {
  const currentUser = ctx.state.user
  const {
    request: {
      body: { user },
    },
  } = ctx

  await handlePromise(service.updateCurrentUser(currentUser, user), ctx)
}
