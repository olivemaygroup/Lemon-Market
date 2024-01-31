"use strict";

import Router from "koa-router";
import userProfile from "../controllers/userprofile.controller.js";
import property from "../controllers/property.controller.js";
import review from "../controllers/review.controller.js";
import favorite from "../controllers/favorites.controller.js";

import authMiddleware from "../auth/auth.js";

const router = new Router();

//  User account related
router.post("/signup", userProfile.signup);
router.post("/login", userProfile.login);
router.get("/myprofile", authMiddleware, userProfile.myProfile);
router.put("/editprofile/:id", authMiddleware, userProfile.editProfile);
router.delete("/deleteaccount", authMiddleware, userProfile.deleteAccount);

// user review related
router.post("/addreview/:property_id", authMiddleware, review.addReview);
router.get("/myreviews", authMiddleware, review.myReviews);
router.put("/editreview/:property_id/:review_id", authMiddleware, review.editReview);
router.delete("/deletereview/:review_id", authMiddleware, review.deleteReview);


// search results
router.get("/getsearchresults", authMiddleware, favorite.getSearchResults);
router.get("/addsearchresults/:property_id", authMiddleware, favorite.addSearchResult);


// user favourites
router.get("/getfavourites", authMiddleware, favorite.getFavorites);
router.post("/addfavourites/:property_id", authMiddleware, favorite.addFavorite);
router.delete(
  "/deletefavourite/:property_id/:favourite_id",
  authMiddleware,
  favorite.removeFavorite,
);

// property get commands
router.post("/checkaddress", property.checkAddress);

export default router;
