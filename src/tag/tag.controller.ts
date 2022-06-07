import * as service from "./tag.service";

export async function getTags(ctx) {
  ctx.body = await service.getTag(ctx);
}

export async function postTags(ctx) {
  ctx.body = await service.postTags(ctx.request.body);
}
