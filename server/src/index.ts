import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import dotenv from "dotenv";
dotenv.config();

const app = new Koa();

import router from "./routers/router";


const PORT = process.env.PORT || 3000;

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server connected on http://0.0.0.0:${PORT}`);
});