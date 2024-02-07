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
const getSearchResults = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        const getSearchResults = yield db_1.default.property.findMany({
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
        const property_id = ctx.params.property_id;
        const tenant = ctx.state.tenant;
        const addedSearchResult = yield db_1.default.search.create({
            data: {
                property_id,
                tenant_id: +tenant.tenant_id,
            },
        });
        ctx.body = addedSearchResult;
        ctx.status = 200;
    }
    catch (error) {
        console.error(error);
        ctx.body = "unable to successfully add search result";
        ctx.status = 500;
    }
});
const getFavorites = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = ctx.state.tenant;
        const favourites = yield db_1.default.property.findMany({
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
const addFavorite = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property_id = ctx.params.property_id;
        const tenant = ctx.state.tenant;
        yield db_1.default.favourite.create({
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
        const property_id = ctx.params.property_id;
        const tenant = ctx.state.tenant;
        // Find the favorite based on property_id and tenant_id
        const favoriteToDelete = yield db_1.default.favourite.findFirst({
            where: {
                tenant_id: +tenant.tenant_id,
                property_id,
            },
        });
        if (!favoriteToDelete) {
            ctx.body = 'Favorite not found';
            ctx.status = 404;
            return;
        }
        // Delete the found favorite
        yield db_1.default.favourite.delete({
            where: {
                favourite_id: favoriteToDelete.favourite_id,
            },
        });
        ctx.body = 'Favourite deleted';
        ctx.status = 200;
    }
    catch (error) {
        console.error(error);
        ctx.body = 'Unable to successfully delete favorite';
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
exports.default = favorite;
