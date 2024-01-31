import { Prisma } from "@prisma/client";
import prisma from "../db";
import { PropertyType } from "../types/types";

import { Context } from "koa";

interface Address {
  property_id: string;
  fullAddress: string;
}

const checkAddress = async (ctx: Context) => {
  try {
    const { property_id, fullAddress } = ctx.request.body as Address

    if (!property_id) {
      ctx.body = 'property_id undefined'
      ctx.status = 500;
    }

    const propertyWithReviews = await prisma.property.findFirst({
      where: {
        property_id: property_id
      },
      include: {
        reviews: {
          include: {
            photos: true,
          },
        },
      },
    });

    if (propertyWithReviews) {
      ctx.body = propertyWithReviews;
      ctx.status = 200;
    } else {
      const newProperty = await prisma.property.create({
        data: {
          property_id,
          fullAddress,
        },
      });
      ctx.body = newProperty;
      ctx.status = 201;
    }
  } catch (err) {
    console.error(err);
    ctx.body = "error when looking for or creating address";
    ctx.status = 500;
  }
};

export default { checkAddress };
