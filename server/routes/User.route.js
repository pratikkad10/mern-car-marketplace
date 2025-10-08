import express from "express";
import { signup, login, logoutUser, getProfile, resetPassword } from "../controllers/User.controller.js";
import { isLoggedIn } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", isLoggedIn, getProfile);

router.post("/logout",isLoggedIn, logoutUser);

router.post("/reset-password", isLoggedIn, resetPassword);

export default router;
