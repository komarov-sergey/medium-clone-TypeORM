import * as service from './article.service'

export async function createArticle(ctx) {
  const {
    request: {
      body: { article },
    },
  } = ctx

  await service
    .createArticle(article)
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}

export async function getArticle(ctx) {
  const {
    params: { slug },
  } = ctx

  await service
    .getArticle(slug)
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}
