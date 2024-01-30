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
const updatePropertyReviewsAndAvgRating = (property, total_rating) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numOfReviews = property === null || property === void 0 ? void 0 : property.num_of_reviews;
        if (numOfReviews > 0) {
            const totalPropertyRating = (property === null || property === void 0 ? void 0 : property.avg_rating) * numOfReviews;
            const newNumOfReviews = numOfReviews + 1;
            const newTotalPropertyRating = (totalPropertyRating + total_rating) / newNumOfReviews;
            yield updatePropertyRating(property, newTotalPropertyRating, newNumOfReviews);
        }
        else {
            const newNumOfReviews = numOfReviews + 1;
            yield prisma.property.update({
                where: {
                    id: +property.id,
                },
                data: {
                    avg_rating: total_rating,
                    num_of_reviews: newNumOfReviews,
                },
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
const updatePropertyRating = (property, newTotalPropertyRating, newNumOfReviews) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.property.update({
        where: {
            id: +property.id,
        },
        data: {
            avg_rating: newTotalPropertyRating,
            num_of_reviews: newNumOfReviews,
        },
    });
});
const getRelatedProperty = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const property_id = ctx.params.property_id;
    const property = yield prisma.property.findFirst({
        where: {
            id: +property_id,
        },
    });
    return property;
});
const addReview = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { t_start, t_end, cleanliness, cleanliness_comment, maintenance, maintenance_comment, value_for_money, value_for_money_comment, deposit_handling, deposit_handling_comment, amenities, amenities_comment, landlord_responsiveness, landlord_responsiveness_comment, total_review_rating, monthly_rent, monthly_bill, council_tax, general_comment, photos, } = ctx.request.body;
        const property = yield getRelatedProperty(ctx);
        if (property) {
            ctx.body = "property does not exist";
            ctx.status = 500;
        }
        const tenant = ctx.state.tenant;
        const newReview = yield prisma.review.create({
            data: {
                property_id: property.id,
                tenant_id: tenant.tenant_id,
                t_start,
                t_end,
                cleanliness,
                cleanliness_comment,
                maintenance,
                maintenance_comment,
                value_for_money,
                value_for_money_comment,
                deposit_handling,
                deposit_handling_comment,
                amenities,
                amenities_comment,
                landlord_responsiveness,
                landlord_responsiveness_comment,
                total_review_rating,
                monthly_rent,
                monthly_bill,
                council_tax,
                general_comment,
            },
        });
        yield prisma.photo.createMany({
            data: photos.map((photo) => (Object.assign(Object.assign({}, photo), { review_id: newReview.review_id }))),
        });
        yield updatePropertyReviewsAndAvgRating(property, total_review_rating);
        const returnValue = yield prisma.review.findFirst({
            where: {
                review_id: newReview.review_id,
            },
            include: {
                photos: true,
            },
        });
        ctx.body = returnValue;
        ctx.status = 200;
    }
    catch (err) {
        console.error(err);
        ctx.body = "Error when adding review";
        ctx.status = 500;
    }
});
const myReviews = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        const allReviews = yield prisma.review.findMany({
            where: {
                tenant_id: tenant.tenant_id,
            },
            include: {
                photos: true,
            },
        });
        ctx.body = allReviews;
        ctx.status = 200;
    }
    catch (err) {
        console.error(err);
        ctx.body = "Error when adding review";
        ctx.status = 500;
    }
});
const editReview = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = +ctx.params.review_id;
        const tenant = ctx.state.tenant;
        const { t_start, t_end, cleanliness, cleanliness_comment, maintenance, maintenance_comment, value_for_money, value_for_money_comment, deposit_handling, deposit_handling_comment, amenities, amenities_comment, landlord_responsiveness, landlord_responsiveness_comment, total_review_rating, monthly_rent, monthly_bill, council_tax, general_comment, } = ctx.request.body;
        const editedReview = yield prisma.review.update({
            where: {
                review_id: reviewId,
                tenant_id: tenant.tenant_id,
            },
            data: {
                t_start,
                t_end,
                cleanliness,
                cleanliness_comment,
                maintenance,
                maintenance_comment,
                value_for_money,
                value_for_money_comment,
                deposit_handling,
                deposit_handling_comment,
                amenities,
                amenities_comment,
                landlord_responsiveness,
                landlord_responsiveness_comment,
                total_review_rating,
                monthly_rent,
                monthly_bill,
                council_tax,
                general_comment,
            },
            include: {
                photos: true,
            },
        });
        ctx.body = editedReview;
        ctx.status = 200;
    }
    catch (err) {
        console.error(err);
        ctx.body = "Error when adding review";
        ctx.status = 500;
    }
});
const deleteReview = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewID = +ctx.params.review_id;
        const tenant = ctx.state.tenant;
        yield prisma.photo.deleteMany({
            where: {
                review_id: reviewID,
            },
        });
        const deleteReview = yield prisma.review.delete({
            where: {
                review_id: reviewID,
                tenant_id: tenant.tenant_id,
            },
        });
        ctx.body = deleteReview;
        ctx.status = 200;
    }
    catch (err) {
        console.error(err);
        ctx.body = "Error when deleting review";
        ctx.status = 500;
    }
});
const review = { addReview, myReviews, editReview, deleteReview };
export default review;
