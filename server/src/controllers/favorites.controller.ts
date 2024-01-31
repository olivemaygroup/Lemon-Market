import prisma from "../db";
import { Tenant } from "../types/types";

import { Context } from "koa";


const getSearchResults = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant;

    const getSearchResults = await prisma.property.findMany({
      where: {
        searches: {
          some: {
            tenant_id: tenant.tenant_id,
          },
        },
      },
    });

    ctx.body = getSearchResults;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.body = "unable to successfully add favourite";
    ctx.status = 500;
  }
};

const addSearchResult = async (ctx: Context) => {
  try {
    const property_id: number = +ctx.params.property_id;
    const tenant: Tenant = ctx.state.tenant;

    const addedSearchResult = await prisma.search.create({
      data: {
        property_id,
        tenant_id: +tenant.tenant_id,
      },
    });

    ctx.body = addedSearchResult;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.body = "unable to successfully add search result";
    ctx.status = 500;
  }
};

const getFavorites = async (ctx: Context) => {
  try {
    const tenant: Tenant = ctx.state.tenant;

    const favourites = await prisma.property.findMany({
      where: {
        favourites: {
          some: {
            tenant_id: tenant.tenant_id,
          },
        },
      },
    });

    ctx.body = favourites;
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.body = "unable to successfully get favourites";
    ctx.status = 500;
  }
};

const addFavorite = async (ctx: Context) => {
  try {
    const property_id: number = +ctx.params.property_id;
    const tenant: Tenant = ctx.state.tenant;

    await prisma.favourite.create({
      data: {
        property_id,
        tenant_id: +tenant.tenant_id,
      },
    });
    ctx.body = "property added to favourites";
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.body = "unable to successfully add favourite";
    ctx.status = 500;
  }
};

const removeFavorite = async (ctx: Context) => {
  try {
    const property_id: number = +ctx.params.property_id;
    const favouriteID: number = +ctx.params.favourite_id;
    const tenant: Tenant = ctx.state.tenant;

    const deletedFavouriate = await prisma.favourite.delete({
      where: {
        favourite_id: favouriteID,
        tenant_id: +tenant.tenant_id,
        property_id,
      },
    });
    ctx.body = 'favourite deleted'
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.body = "unable to successfully delete favourite";
    ctx.status = 500;
  }
};

const favorite = {
  addSearchResult,
  getSearchResults,
  getFavorites,
  addFavorite,
  removeFavorite,
};

export default favorite;
