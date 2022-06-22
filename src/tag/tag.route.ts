import Router from 'koa-router'

import { TagController } from './tag.repository'

export default new Router().get('/', getTags)
// .post('/', postTags)

export async function getTags(ctx) {
  await handlePromise(TagController.getTags(), ctx)
}

export async function postTags(ctx) {
  const {
    request: {
      body: { name },
    },
  } = ctx

  await handlePromise(TagController.postTags(name), ctx)
}

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
