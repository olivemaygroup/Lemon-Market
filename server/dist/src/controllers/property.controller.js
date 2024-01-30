var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import prisma from "../db";
// interface Test extends Context {
//   request: {
//     body: PropertyType
//   }
// }
const checkAddress = (ctx) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { number, apartment, street, postcode, city } = ctx.request.body;
      const propertyWithReviews = yield prisma.property.findFirst({
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
  });
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
