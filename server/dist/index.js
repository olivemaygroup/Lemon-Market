"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
const app = new koa_1.default();
const router_1 = __importDefault(require("./routers/router"));
const PORT = 3001;
app
    .use((0, koa_bodyparser_1.default)())
    .use((0, cors_1.default)())
    .use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
app.listen(PORT, () => {
    console.log(`Server connected on http://localhost:${PORT}`);
});
