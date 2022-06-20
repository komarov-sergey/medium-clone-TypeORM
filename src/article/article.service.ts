import { ArticleController, ArticleRepository } from './article.repository'

export async function createArticle(article, user) {
  const newArticle = await ArticleController.createArticle(article, user)

  return {
    article: ArticleController.toCreateJSON(newArticle),
  }
}

export async function getArticle(slug) {
  const article = await ArticleRepository.findOneBy({ slug })

  return {
    article: ArticleController.toGetJSON(article),
  }
}
