import * as service from './tag.service'

export async function getTags(ctx) {
  await service
    .getTag()
    .then(data => (ctx.body = data))
    .catch(err => {
      err => {
        ctx.status = 422
        ctx.body = { errors: { body: [err.toString()] } }
      }
    })
}

export async function postTags(ctx) {
  const {
    request: {
      body: { name },
    },
  } = ctx

  await service
    .postTags(name)
    .then(data => (ctx.body = data))
    .catch(err => {
      err => {
        ctx.status = 422
        ctx.body = { errors: { body: [err.toString()] } }
      }
    })
}
