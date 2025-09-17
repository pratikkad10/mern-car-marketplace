import express from "express"
import { createCar, getCars } from "../controllers/Car.controller.js";
import { isLoggedIn } from "../middleware/user.middleware.js";
import upload from "../middleware/uploadMiddleware.js";
const carRouter = express.Router()

carRouter.get("/", getCars);

// carRouter.post("/car",isLoggedIn, upload.array("image", 5), createCar);
carRouter.post("/car", isLoggedIn, upload.fields([
    { name: "images", maxCount: 5 },  // multiple images
    { name: "image", maxCount: 1 }    // single image (if frontend sends this)
]), createCar);

export default carRouter;
