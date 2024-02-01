import { Prisma } from "@prisma/client";
import prisma from "../db";
import { PropertyType } from "../types/types";

import { Context } from "koa";

const checkAddress = async (ctx: Context) => {
  try {
    const { property_id, fullAddress } = ctx.request.body as PropertyType

    if (!property_id) {
      ctx.body = 'property_id undefined'
      ctx.status = 500;
    }

    const property = await prisma.property.findFirst({
      where: {
        property_id: property_id,
      },
      include: {
        reviews: {
          include: {
            photos: true,
          },
        },
      },
    });

    if (property) {
      if (property.num_of_reviews > 0){
        ctx.body = property;
        ctx.status = 200;
        return
      } else {
        ctx.body = property;
        ctx.status = 201;
        return
      }
    } else {
      const newProperty = await prisma.property.create({
        data: {
          property_id,
          fullAddress,
        },
      });
      ctx.body = newProperty;
      ctx.status = 202;
    }
  } catch (err) {
    console.error(err);
    ctx.body = "error when looking for or creating address";
    ctx.status = 500;
  }
};

export default { checkAddress };
