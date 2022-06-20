import * as service from './tag.service'

function handlePromise(promise, ctx) {
  return promise
    .then(data => (ctx.body = data))
    .catch(err => {
      err => {
        ctx.status = 422
        ctx.body = { errors: { body: [err.toString()] } }
      }
    })
}

export async function getTags(ctx) {
  await handlePromise(service.getTag(), ctx)
}

export async function postTags(ctx) {
  const {
    request: {
      body: { name },
    },
  } = ctx

  await handlePromise(service.postTags(name), ctx)
}
