import Router from "koa-router";

import * as controller from "./tag.controller";

export default new Router().get("/", controller.getTags);
// .post("/", controller.postTags);
