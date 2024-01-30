var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import prisma from "../db";
const SECRET_KEY = process.env.SECRET_KEY;
const authMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.headers["authorization"];
    if (!token) {
        ctx.status = 403;
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const tenant = yield prisma.tenant.findUnique({
            where: {
                tenant_id: +decoded,
            },
        });
        if (!tenant) {
            ctx.status = 401;
            ctx.body = "user not authenticated";
            return;
        }
        ctx.state.tenant = tenant;
        yield next();
    }
    catch (error) {
        ctx.body = "user not authorised";
        ctx.status = 401;
    }
});
export default authMiddleware;
