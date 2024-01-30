import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();

import router from "./routers/router";

const PORT = 3001;

app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server connected on http://localhost:${PORT}`);
});
