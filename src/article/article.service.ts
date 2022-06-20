import { ArticleController, ArticleRepository } from './article.repository'

export async function createArticle(article) {
  const newArticle = await ArticleController.createArticle(article)

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
