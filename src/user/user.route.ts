import Router from "koa-router";

import auth from "../middleware/auth";

import * as controller from "./user.controller";

export default new Router()
  .post("/", controller.registerUser)
  .post("/login", controller.login)
  .get("/", auth, controller.getCurrentUser)
  .put("/", auth, controller.updateCurrentUser);
