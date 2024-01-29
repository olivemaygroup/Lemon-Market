import { Prisma } from "@prisma/client";
import prisma from "../db";
import { Context } from "koa";
import exp from "constants";
import { PropertyType, Review, Tenant } from "../types/types";
import { createContext } from "vm";


const updatePropertyReviewsAndAvgRating = async (property: any, total_rating: number, property_id: number): Promise<void> => {
  try {
    const numOfReviews = property?.num_of_reviews
    if (numOfReviews > 0) {
      const totalPropertyRating = property?.avg_rating * numOfReviews
      const newNumOfReviews = numOfReviews + 1
      const newTotalPropertyRating = (totalPropertyRating + total_rating) / newNumOfReviews
      await prisma.property.update({
        where: {
          id: property_id,
        },
        data: {
          avg_rating: newTotalPropertyRating,
          num_of_reviews: (newNumOfReviews)
        }
      })
    } else {
      const newNumOfReviews = numOfReviews + 1
      await prisma.property.update({
        where: {
          id: property_id,
        },
        data: {
          avg_rating: total_rating,
          num_of_reviews: (newNumOfReviews)
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
}

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

    const property_id: number = ctx.params.property_id

    const property = await prisma.property.findFirst({
      where: {
        id: property_id,
      }
    })

    const tenant: Tenant = ctx.state.tenant

    await prisma.review.create({
      data: {
        property_id,
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
        general_comment
      }
    });

    await updatePropertyReviewsAndAvgRating(property, total_review_rating, property_id)

    ctx.body = "successfully added review"
    ctx.status = 200;
  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }
}

const myReviews = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant

    const allReviews = await prisma.review.findMany({
      where: {
        tenant_id: tenant.tenant_id,
      },
      include: {
        photos: true
      }
    })


  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }


};

const editReview = async (ctx: Context) => {
  try {
    const reviewId = ctx.params.review_id
    const tenant: Tenant = ctx.state.tenant
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
      general_comment
    } = ctx.request.body as Review;

    await prisma.review.update({
      where: {
        review_id: reviewId,
        tenant_id: tenant.tenant_id
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
        general_comment
      }
    })
  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }
};

const deleteReview = async (ctx: Context) => {
  try {
    const reviewID = ctx.params.review_id
    const tenant: Tenant = ctx.state.tenant

    const deleteReview = await prisma.review.delete({
      where: {
        review_id: reviewID,
        tenant_id: tenant.tenant_id
      },
    })
    ctx.body = deleteReview;
    ctx.status = 200;
  } catch (err) {
    console.error(err);
    ctx.body = "Error when adding review";
    ctx.status = 500;
  }
};


const review = { addReview, myReviews, editReview, deleteReview };

export default review;

