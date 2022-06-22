import { AppDataSource } from '../data-source'
import slug from 'slug'

import { Article } from './article.entity'
import { SimpleConsoleLogger } from 'typeorm'
import { DatabaseError } from '../error'

export const ArticleRepository = AppDataSource.getRepository(Article)

export class ArticleController {
  private static setSlug(title) {
    return (
      slug(title) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    )
  }

  public static async createArticle(data, user) {
    try {
      const slug = this.setSlug(data.title)

      const newArticle = await ArticleRepository.save({
        ...data,
        slug,
        author: user,
      })
      return {
        article: this.toGetJSON(newArticle),
      }
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public static async getArticle(slug) {
    try {
      const article = await ArticleRepository.findOneBy({ slug })

      return {
        article: ArticleController.toGetJSON(article),
      }
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public static toCreateJSON(article) {
    return {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    }
  }

  public static toGetJSON(article) {
    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      author: article.author,
      //TODO add this fields
      // favorited: false,
      // favoritesCount: 0,
    }
  }
}
