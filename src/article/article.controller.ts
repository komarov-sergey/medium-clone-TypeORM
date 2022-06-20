import * as service from './article.service'

function handlePromise(promise, ctx) {
  return promise
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}

export async function createArticle(ctx) {
  const {
    request: {
      body: { article },
    },
    state: { user },
  } = ctx

  await handlePromise(service.createArticle(article, user), ctx)
}

export async function getArticle(ctx) {
  const {
    params: { slug },
  } = ctx

  await handlePromise(service.getArticle(slug), ctx)
}
