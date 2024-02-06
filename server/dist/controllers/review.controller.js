"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const addReview = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { t_start, t_end, cleanliness, cleanliness_comment, maintenance, maintenance_comment, value_for_money, value_for_money_comment, deposit_handling, deposit_handling_comment, amenities, amenities_comment, landlord_responsiveness, landlord_responsiveness_comment, total_review_rating, monthly_rent, monthly_bill, council_tax, general_comment, photos, } = ctx.request.body;
        const property = yield getRelatedProperty(ctx);
        if (!property) {
            ctx.body = "property does not exist";
            ctx.status = 500;
            return;
        }
        const tenant = ctx.state.tenant;
        const newReview = yield db_1.default.review.create({
            data: {
                property_id: property.property_id,
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
        yield db_1.default.photo.createMany({
            data: photos.map((photo) => (Object.assign(Object.assign({}, photo), { review_id: newReview.review_id }))),
        });
        yield updatePropertyReviewsAndAvgRating(property, newReview.total_review_rating);
        yield db_1.default.review.findFirst({
            where: {
                review_id: newReview.review_id,
            },
            include: {
                photos: true,
            },
        });
        ctx.body = 'review added';
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
        const allReviewsWithProperty = yield db_1.default.property.findMany({
            where: {
                reviews: {
                    some: {
                        tenant_id: tenant.tenant_id
                    }
                }
            },
            include: {
                reviews: {
                    include: {
                        photos: true
                    }
                }
            },
        });
        ctx.body = allReviewsWithProperty;
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
        const review_id = +ctx.params.review_id;
        const tenant = ctx.state.tenant;
        const property = yield getRelatedProperty(ctx);
        const { t_start, t_end, cleanliness, cleanliness_comment, maintenance, maintenance_comment, value_for_money, value_for_money_comment, deposit_handling, deposit_handling_comment, amenities, amenities_comment, landlord_responsiveness, landlord_responsiveness_comment, total_review_rating, monthly_rent, monthly_bill, council_tax, general_comment, photos, } = ctx.request.body;
        const editedReview = yield db_1.default.review.update({
            where: {
                property_id: property.property_id,
                review_id: review_id,
                tenant_id: tenant.tenant_id,
            },
            data: {
                property_id: property.property_id,
                review_id: review_id,
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
            include: {
                photos: true,
            },
        });
        // looking to decide whether how photos should be updated or removed from reviews - currently just delted and add the updated photos
        yield db_1.default.photo.deleteMany({
            where: {
                review_id: review_id,
            },
        });
        yield db_1.default.photo.createMany({
            data: photos.map((photo) => (Object.assign(Object.assign({}, photo), { review_id: editedReview.review_id }))),
        });
        yield updatePropertyReviewsAndAvgRating(property, editedReview.total_review_rating);
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
        const review_id = +ctx.params.review_id;
        const tenant = ctx.state.tenant;
        yield db_1.default.photo.deleteMany({
            where: {
                review_id: review_id,
            },
        });
        const deleteReview = yield db_1.default.review.delete({
            where: {
                review_id: review_id,
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
const updatePropertyReviewsAndAvgRating = (property, total_rating) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numOfReviews = property.num_of_reviews;
        if (numOfReviews > 0) {
            const totalPropertyRating = (property === null || property === void 0 ? void 0 : property.avg_rating) * numOfReviews;
            const newNumOfReviews = numOfReviews + 1;
            const newTotalPropertyRating = (totalPropertyRating + total_rating) / newNumOfReviews;
            yield updatePropertyRating(property, newTotalPropertyRating, newNumOfReviews);
        }
        else {
            const newNumOfReviews = 1;
            yield db_1.default.property.update({
                where: {
                    property_id: property.property_id,
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
    yield db_1.default.property.update({
        where: {
            property_id: property.property_id,
        },
        data: {
            avg_rating: newTotalPropertyRating,
            num_of_reviews: newNumOfReviews,
        },
    });
});
const getRelatedProperty = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const property_id = ctx.params.property_id;
    const property = yield db_1.default.property.findFirst({
        where: {
            property_id: property_id,
        },
    });
    return property;
});
exports.default = review;
