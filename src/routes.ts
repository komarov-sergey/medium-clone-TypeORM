import Router from "koa-router";

import errorHandler from "./middleware/err";
import tag from "./tag/tag.route";
import user from "./user/user.route";
import article from "./article/article.route";

export default new Router({ prefix: "/api" })
  .use(errorHandler)
  .use("/tags", tag.routes())
  .use(["/user", "/users"], user.routes())
  .use("/articles", article.routes());
