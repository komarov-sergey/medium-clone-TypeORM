import { ArticleController, ArticleRepository } from "./article.repository";

export async function createArticle(ctx) {
  let article;
  let body = ctx.request.body.article;
  try {
    article = await ArticleController.createArticle(body);
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in createArticle()"],
      },
    };
  }

  return {
    article: ArticleController.toCreateJSON(article),
  };
}

export async function getArticle(ctx) {
  let article;
  let slug = ctx.params.slug;
  try {
    article = await ArticleRepository.findOneBy({ slug });
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in getArticle()"],
      },
    };
  }

  return {
    article: ArticleController.toGetJSON(article),
  };
}
