"use strict";

import Router from "koa-router";
import userProfile from "../controllers/userprofile.controller.js";
import property from "../controllers/property.controller.js";
import review from "../controllers/review.controller.js";
import favorite from "../controllers/favorites.controller.js";

const router = new Router();

//  User account related
router.post("/signup", userProfile.signup);
router.post("/login", userProfile.login);
router.get("/myprofile", userProfile.myProfile);
router.put("/editprofile/:id", userProfile.editProfile);
router.delete("/deleteaccount", userProfile.deleteAccount);

// user review related
router.post("/addreview", review.addReview);
router.get("/myreviews", review.myReviews);
router.put("/editreview/:review_id", review.editReview);
router.delete("/deletereview/:review_id", review.deleteReview);

// user favourites
router.get("/favourite", favorite.getFavorites);
router.post("/addfavorite/:review_id", favorite.addFavorite);
router.delete("/removefavorite/:review_id/:favourite_id", favorite.removeFavorite);

// property get commands
router.post("/checkaddress", property.checkAddress);
// router.get('/propertydetail', property.propertyDetail);

export default router;