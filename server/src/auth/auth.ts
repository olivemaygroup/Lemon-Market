import jwt from 'jsonwebtoken';
import prisma from '../db';

import { Context, Next } from 'koa';

const SECRET_KEY = process.env.SECRET_KEY

const authMiddleware = async (ctx: Context, next: Next) => {
  // Extract token from auth headers
  const authHeader = ctx.headers['authorization'];
  if (!authHeader) {
    ctx.status = 403;
    return;
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { _id: number };

    const tenant = await prisma.tenant.findUnique({
      where: {
        tenant_id: decoded._id
      }
    }
    );
    if (!tenant) {
      ctx.status = 401;
      ctx.body = 'user not authenticated'
      return;
    }

    ctx.state.tenant = tenant; // Koa convention is to use ctx.state for passing information
    await next();
  } catch (error) {
    ctx.status = 401;
  }
};

export default authMiddleware;
