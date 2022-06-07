import { AppDataSource } from "./data-source";
import Koa from "koa";
import koaBody from "koa-body";

import api from "./routes";

const app = new Koa();

AppDataSource.initialize()
  .then(() => {
    app.use(koaBody()).use(api.routes()).listen(3002);
  })
  .catch((error) => console.log(error));
