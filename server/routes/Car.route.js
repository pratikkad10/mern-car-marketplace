import express from "express"
import { createCar, createTestDrive, deleteCar, getAllTestDrive, getCars, getInterestedCars, getTestDrive, interestedCar } from "../controllers/Car.controller.js";
import { isLoggedIn } from "../middleware/user.middleware.js";
import upload from "../middleware/uploadMiddleware.js";
const carRouter = express.Router()

carRouter.get("/", getCars);

carRouter.delete("/car", isLoggedIn, deleteCar);

// carRouter.post("/car",isLoggedIn, upload.array("image", 5), createCar);
carRouter.post("/car", isLoggedIn, upload.fields([
    { name: "images", maxCount: 5 },  // multiple images
    { name: "image", maxCount: 1 }    // single image (if frontend sends this)
]), createCar);

carRouter.post("/interestedUser", isLoggedIn, interestedCar);

carRouter.get("/interestedUser", isLoggedIn, getInterestedCars);

carRouter.post("/test-drive", isLoggedIn, createTestDrive);

carRouter.get("/test-drive", isLoggedIn, getTestDrive);

//we have to make this admin only route
carRouter.get("/allTestDrive", getAllTestDrive);

export default carRouter;
