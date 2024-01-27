import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
const app = new Koa();
const router = new Router();
const PORT = 3000;
router.get('/', ctx => {
    ctx.body = 'Hello World';
});
app
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(PORT, () => {
    console.log(`Server connected on http://localhost:${PORT}`);
});
