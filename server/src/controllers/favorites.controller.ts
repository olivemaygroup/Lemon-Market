
import { Prisma } from "@prisma/client";
import prisma from "../db";
import { PropertyType, Tenant, Review } from "../types/types";

import { Context } from "koa";

const getFavorites = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant

    const favourites = await prisma.favourite.findMany({
      where: {
        tenant_id: tenant.tenant_id
      }
    })

    // const resultArr: Promise<Review> = favourites.map(async (review) => {
    //   try {
    //     return await prisma.review.findUnique({
    //       where: {
    //         tenant_id: tenant.tenant_id,
    //         review_id: review.review_id,
    //       },
    //       include: {
    //         photos: true
    //       }
    //     })
    //   } catch (error) {
    //     console.error(error)
    //   }
    // })

    // Promise.all(resultArr).then((response) => {
    //   ctx.body = response;
    //   ctx.status = 200;
    // }).catch(error => {
    //   console.error(error)
    //   ctx.body = 'unable to successfully get favourites'
    //   ctx.status = 500
    // })

  } catch (error) {
    console.error(error)
    ctx.body = 'unable to successfully get favourites'
    ctx.status = 500
  }
};

const addFavorite = async (ctx: Context) => {
  try {
    const reviewID: number = ctx.params.review_id
    const tenant: Tenant = ctx.state.tenant

    await prisma.favourite.create({
      data: {
        review_id: reviewID,
        tenant_id: tenant.tenant_id,
      }
    })

  } catch (error) {
    console.error(error)
    ctx.body = 'unable to successfully add favourite'
    ctx.status = 500
  }
};

const removeFavorite = async (ctx: Context) => {
  try {
    const reviewID: number = ctx.params.review_id
    const favouriteID: number = ctx.params.favourite_id
    const tenant: Tenant = ctx.state.tenant

    const deletedFavouriate = await prisma.favourite.delete({
      where: {
        favourite_id: favouriteID,
        tenant_id: tenant.tenant_id,
        review_id: reviewID,
      }
    })
    ctx.body = deletedFavouriate;
    ctx.status = 200;
  } catch (error) {
    console.error(error)
    ctx.body = 'unable to successfully delete favourite'
    ctx.status = 500
  }

};



const favorite = { getFavorites, addFavorite, removeFavorite };

export default favorite;
