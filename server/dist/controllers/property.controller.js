var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../db";
const checkAddress = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, apartment, street, postcode, city } = (ctx.request.body);
        if (!number || !street || !postcode || !city || !apartment) {
            ctx.body = "undefined number, street or postcode";
            ctx.status = 500;
        }
        const propertyWithReviews = yield prisma.property.findFirst({
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
        }
        else {
            const newProperty = yield prisma.property.create({
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
    }
    catch (err) {
        console.error(err);
        ctx.body = "error when looking for or creating address";
        ctx.status = 500;
    }
});
export default { checkAddress };
