import * as service from "./article.service";

export async function createArticle(ctx) {
  ctx.body = await service.createArticle(ctx);
}

export async function getArticle(ctx) {
  ctx.body = await service.getArticle(ctx);
}
