"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const userprofile_controller_js_1 = __importDefault(require("../controllers/userprofile.controller.js"));
const property_controller_js_1 = __importDefault(require("../controllers/property.controller.js"));
const review_controller_js_1 = __importDefault(require("../controllers/review.controller.js"));
const favourites_controller_js_1 = __importDefault(require("../controllers/favourites.controller.js"));
const auth_js_1 = __importDefault(require("../auth/auth.js"));
const router = new koa_router_1.default();
//  User account related
router.post("/signup", userprofile_controller_js_1.default.signup);
router.post("/login", userprofile_controller_js_1.default.login);
router.get("/myprofile", auth_js_1.default, userprofile_controller_js_1.default.myProfile);
router.put("/editprofile", auth_js_1.default, userprofile_controller_js_1.default.editProfile);
router.delete("/deleteaccount", auth_js_1.default, userprofile_controller_js_1.default.deleteAccount);
router.get("/checkUser", auth_js_1.default, userprofile_controller_js_1.default.checkUser);
// user review related
router.post("/addreview/:property_id", auth_js_1.default, review_controller_js_1.default.addReview);
router.get("/myreviews", auth_js_1.default, review_controller_js_1.default.myReviews);
router.put("/editreview/:property_id/:review_id", auth_js_1.default, review_controller_js_1.default.editReview);
router.delete("/deletereview/:review_id", auth_js_1.default, review_controller_js_1.default.deleteReview);
// search results
router.get("/getsearchresults", auth_js_1.default, favourites_controller_js_1.default.getSearchResults);
router.get("/addsearchresults/:property_id", auth_js_1.default, favourites_controller_js_1.default.addSearchResult);
// user favourites
router.get("/getfavourites", auth_js_1.default, favourites_controller_js_1.default.getFavorites);
router.post("/addfavourites/:property_id", auth_js_1.default, favourites_controller_js_1.default.addFavorite);
router.delete("/deletefavourite/:property_id", auth_js_1.default, favourites_controller_js_1.default.removeFavorite);
// property get commands
router.post("/checkaddress", property_controller_js_1.default.checkAddress);
exports.default = router;
