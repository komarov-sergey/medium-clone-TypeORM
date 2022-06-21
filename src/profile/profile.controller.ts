import * as service from './profile.service'

function handleProfilePromise(promise, ctx) {
  return promise
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}

export async function getProfile(ctx) {
  const {
    params: { username },
  } = ctx

  await handleProfilePromise(service.getProfile(username), ctx)
}

export async function followUser() {
  service.followUser()
}

export async function unfollowUser() {
  service.unfollowUser()
}
