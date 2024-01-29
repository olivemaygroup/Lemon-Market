import jwt from 'jsonwebtoken';
import prisma from '../db';

import { Context, Next } from 'koa';

const SECRET_KEY = process.env.SECRET_KEY

const authMiddleware = async (ctx: Context, next: Next) => {
  // Extract token from auth headers
  const token = ctx.headers['authorization'];
  if (!token) {
    ctx.status = 403;
    return;
  }

  try {
    const decoded: number = jwt.verify(token, SECRET_KEY)

    const tenant = await prisma.tenant.findUnique({
      where: {
        tenant_id: +decoded
      }
    }
    );
    if (!tenant) {
      ctx.status = 401;
      ctx.body = 'user not authenticated'
      return;
    }

    ctx.state.tenant = tenant;
    await next();
  } catch (error) {
    ctx.body = "user not authorised"
    ctx.status = 401;
  }
};

export default authMiddleware;
