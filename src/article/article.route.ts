import Router from "koa-router";

import auth from "../middleware/auth";

import * as controller from "./article.controller";

export default new Router()
  .post("/", auth, controller.createArticle)
  .get("/", controller.getArticle);
