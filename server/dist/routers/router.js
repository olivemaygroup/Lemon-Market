"use strict";
import Router from "koa-router";
import userProfile from "../controllers/userprofile.controller.js";
import property from "../controllers/property.controller.js";
import review from "../controllers/review.controller.js";
import favorite from "../controllers/favorites.controller.js";
const router = new Router();
//  User account related
router.post("/signup", userProfile.signup);
router.post("/addprofile", userProfile.addProfile);
router.post("/login", userProfile.login);
router.get("/myprofile", userProfile.myProfile);
router.put("/editprofile/:id", userProfile.editProfile);
router.delete("/deleteaccount", userProfile.deleteAccount);
// user review related
router.post("/addreview", review.addReview);
router.get("/myreviews", review.myReviews);
router.put("/editreview/:id", review.editReview);
router.delete("/deletereview/:id", review.deleteReview);
// user favourites
router.get("/favourite", favorite.getFavorites);
router.post("/addfavorite", favorite.addFavorite);
router.delete("/removefavorite", favorite.removeFavorite);
// property get commands
router.get("/checkaddress", property.checkAddress);
router.get("/propertydetail", property.propertyDetail);
export default router;
