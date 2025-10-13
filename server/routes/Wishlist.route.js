import express from "express";
import { isLoggedIn } from "../middleware/user.middleware.js";
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/Wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", isLoggedIn, addToWishlist);
wishlistRouter.delete("/remove/:carId", isLoggedIn, removeFromWishlist);
wishlistRouter.get("/", isLoggedIn, getWishlist);

export default wishlistRouter;
