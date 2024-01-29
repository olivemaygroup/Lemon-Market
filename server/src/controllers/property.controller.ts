import { Prisma } from "@prisma/client";
import prisma from "../db";
import PropertyType from "../types/types";

import { Context } from "koa";

// interface Test extends Context {
//   request: {
//     body: PropertyType
//   }
// }

const checkAddress = async (ctx: Context) => {
  try {
    const { number, apartment, street, postcode, city } = <PropertyType> ctx.request.body

    const propertyWithReviews = await prisma.property.findFirst({
      where: {
        number: number,
        street: street,
        postcode: postcode,
        city: city,
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
      ctx.body = "address with review(s) not found";
      ctx.status = 201;
    }
  } catch (err) {
    console.error(err);
    ctx.body = "error when looking for address";
    ctx.status = 500;
  }
};

// const propertyDetail = async (ctx: Context) => {
//   try {
//     const { number, apartment, street, postcode, city } = <PropertyType>ctx.request.body
//     const propertyWithReviews = await prisma.property.findFirst({
//       where: {
//         number: number,
//         street: street,
//         postcode: postcode,
//         city: city,
//       },
//       include: {
//         reviews: {
//           include: {
//             photos: true,
//           }
//         }
//       }
//     });
//     ctx.status = 200;
//   } catch (err) {
//     console.error(err)
//     ctx.body = err;
//     ctx.status = 500;
//   }
// };

export default { checkAddress };
