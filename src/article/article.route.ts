import Router from 'koa-router'

import auth from '../middleware/auth'
import { ArticleController } from './article.repository'

export default new Router()
  .post('/', auth, createArticle)
  .get('/:slug', getArticle)

export async function createArticle(ctx) {
  const {
    request: {
      body: { article },
    },
    state: { user },
  } = ctx

  await handlePromise(ArticleController.createArticle(article, user), ctx)
}

export async function getArticle(ctx) {
  const {
    params: { slug },
  } = ctx

  await handlePromise(ArticleController.getArticle(slug), ctx)
}

function handlePromise(promise, ctx) {
  return promise
    .then(data => (ctx.body = data))
    .catch(err => {
      ctx.status = 422
      ctx.body = { errors: { body: [err.toString()] } }
    })
}
