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
const getFavorites = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        const favourites = yield prisma.property.findMany({
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
    }
    catch (error) {
        console.error(error);
        ctx.body = "unable to successfully get favourites";
        ctx.status = 500;
    }
});
const getSearchResults = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        const getSearchResults = yield prisma.property.findMany({
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
    }
    catch (error) {
        console.error(error);
        ctx.body = "unable to successfully add favourite";
        ctx.status = 500;
    }
});
const addSearchResult = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property_id = +ctx.params.property_id;
        const tenant = ctx.state.tenant;
        yield prisma.search.create({
            data: {
                property_id,
                tenant_id: +tenant.tenant_id,
            },
        });
    }
    catch (error) {
        console.error(error);
        ctx.body = "unable to successfully add search result";
        ctx.status = 500;
    }
});
const addFavorite = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property_id = +ctx.params.property_id;
        const tenant = ctx.state.tenant;
        yield prisma.favourite.create({
            data: {
                property_id,
                tenant_id: +tenant.tenant_id,
            },
        });
        ctx.body = "property added to favourites";
        ctx.status = 200;
    }
    catch (error) {
        console.error(error);
        ctx.body = "unable to successfully add favourite";
        ctx.status = 500;
    }
});
const removeFavorite = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property_id = +ctx.params.property_id;
        const favouriteID = +ctx.params.favourite_id;
        const tenant = ctx.state.tenant;
        const deletedFavouriate = yield prisma.favourite.delete({
            where: {
                favourite_id: favouriteID,
                tenant_id: +tenant.tenant_id,
                property_id,
            },
        });
        ctx.body = deletedFavouriate;
        ctx.status = 200;
    }
    catch (error) {
        console.error(error);
        ctx.body = "unable to successfully delete favourite";
        ctx.status = 500;
    }
});
const favorite = {
    addSearchResult,
    getSearchResults,
    getFavorites,
    addFavorite,
    removeFavorite,
};
export default favorite;
