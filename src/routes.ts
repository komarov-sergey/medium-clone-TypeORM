import Router from "koa-router";

// const errorHandler = require("./middleware/err");
import tag from "./tag/tag.route";
// const user = require("./user/route");
// const article = require("./article/route");

export default new Router({ prefix: "/api" }).use("/tags", tag.routes());

// .use(["/user", "/users"], user.routes())
// .use("/articles", article.routes());
