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
router.post("/addreview", authMiddleware, review.addReview);
router.get("/myreviews", authMiddleware, review.myReviews);
router.put("/editreview/:review_id", authMiddleware, review.editReview);
router.delete("/deletereview/:review_id", authMiddleware, review.deleteReview);

// user favourites
router.get("/favourite", authMiddleware, favorite.getFavorites);
router.post("/addfavorite/:review_id", authMiddleware, favorite.addFavorite);
router.delete("/removefavorite/:review_id/:favourite_id", authMiddleware, favorite.removeFavorite);

// property get commands
router.post("/checkaddress", property.checkAddress);
// router.get('/propertydetail', property.propertyDetail);

export default router;