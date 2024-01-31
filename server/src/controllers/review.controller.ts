import { Prisma } from "@prisma/client";
import prisma from "../db";
import { Context } from "koa";
import exp from "constants";
import { PropertyType, Review, Tenant } from "../types/types";
import { createContext } from "vm";

const addReview = async (ctx: Context) => {
  try {
    const {
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
      photos,
    } = ctx.request.body as Review;

    const property = await getRelatedProperty(ctx);

    if (property) {
      ctx.body = "property does not exist";
      ctx.status = 500;
    }

    const tenant: Tenant = ctx.state.tenant;

    const newReview = await prisma.review.create({
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
    await prisma.photo.createMany({
      data: photos.map((photo) => ({
        ...photo,
        review_id: newReview.review_id,
      })),
    });

    await updatePropertyReviewsAndAvgRating(property, newReview.total_review_rating);

    const returnValue = await prisma.review.findFirst({
      where: {
        review_id: newReview.review_id,
      },
      include: {
        photos: true,
      },
    });

    ctx.body = 'review added';
    ctx.status = 200;
  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }
};

const myReviews = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant;

    const allReviews = await prisma.review.findMany({
      where: {
        tenant_id: tenant.tenant_id,
      },
      include: {
        photos: true,
      },
    });

    ctx.body = allReviews;
    ctx.status = 200;
  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }
};

const editReview = async (ctx: Context) => {
  try {
    const reviewId = +ctx.params.review_id;

    const tenant: Tenant = ctx.state.tenant;

    const {
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
    } = ctx.request.body as Review;

    const editedReview = await prisma.review.update({
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
  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }
};

const deleteReview = async (ctx: Context) => {
  try {
    const reviewID = +ctx.params.review_id;
    const tenant: Tenant = ctx.state.tenant;

    await prisma.photo.deleteMany({
      where: {
        review_id: reviewID,
      },
    });

    const deleteReview = await prisma.review.delete({
      where: {
        review_id: reviewID,
        tenant_id: tenant.tenant_id,
      },
    });
    ctx.body = deleteReview;
    ctx.status = 200;
  } catch (err) {
    console.error(err);
    ctx.body = "Error when deleting review";
    ctx.status = 500;
  }
};

const review = { addReview, myReviews, editReview, deleteReview };

const updatePropertyReviewsAndAvgRating = async (
  property: PropertyType,
  total_rating: number,
): Promise<void> => {
  try {
    const numOfReviews = property.num_of_reviews;
    if (numOfReviews > 0) {
      const totalPropertyRating = property?.avg_rating * numOfReviews;
      const newNumOfReviews = numOfReviews + 1;
      const newTotalPropertyRating =
        (totalPropertyRating + total_rating) / newNumOfReviews;

      await updatePropertyRating(
        property,
        newTotalPropertyRating,
        newNumOfReviews,
      );
    } else {
      const newNumOfReviews = 1;
      await prisma.property.update({
        where: {
          property_id: property.property_id,
        },
        data: {
          avg_rating: total_rating,
          num_of_reviews: newNumOfReviews,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePropertyRating = async (
  property: PropertyType,
  newTotalPropertyRating: number,
  newNumOfReviews: number,
) => {
  await prisma.property.update({
    where: {
      property_id: property.property_id,
    },
    data: {
      avg_rating: newTotalPropertyRating,
      num_of_reviews: newNumOfReviews,
    },
  });
};

const getRelatedProperty = async (ctx: Context) => {
  const property_id: string = ctx.params.property_id;
  const property = await prisma.property.findFirst({
    where: {
      property_id: property_id,
    },
  });
  return property;
};


export default review;
