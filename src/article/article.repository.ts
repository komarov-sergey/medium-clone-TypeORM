import { AppDataSource } from "../data-source";
import slug from "slug";

import { Article } from "./article.entity";

export const ArticleRepository = AppDataSource.getRepository(Article);

export class ArticleController {
  private static setSlug(title) {
    return (
      slug(title) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  public static createArticle(data) {
    const slug = this.setSlug(data.title);

    return ArticleRepository.save({ ...data, slug });
  }

  public static toCreateJSON(article) {
    return {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    };
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
    };
  }
}
