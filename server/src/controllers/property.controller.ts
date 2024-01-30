import { Prisma } from "@prisma/client";
import prisma from "../db";
import { PropertyType } from "../types/types";

import { Context } from "koa";

const checkAddress = async (ctx: Context) => {
  try {
    const { number, apartment, street, postcode, city } = <PropertyType>(
      ctx.request.body
    );

    if (!number || !street || !postcode || !city || !apartment) {
      ctx.body = "undefined number, street or postcode";
      ctx.status = 500;
    }

    const propertyWithReviews = await prisma.property.findFirst({
      where: {
        number: number,
        street: street,
        postcode: postcode,
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
          number: number,
          street: street,
          postcode: postcode,
          city: city,
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
