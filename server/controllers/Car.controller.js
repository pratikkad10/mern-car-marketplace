import CarModel from "../models/Car.model.js";
import User from "../models/User.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


export const getCars = async (req, res) => {
    try {
        const cars = await CarModel.find()
        res.status(200).json({
            success: true,
            cars: cars
        })
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// export const getCar = async (req, res) => {
//     try {
//         const car = await CarModel.findById(req.params.id)
//         res.status(200).json({
//             success: true,
//             car: car
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message
//         })
//     }
// }

export const createCar = async (req, res) => {
    try {
        const { carName, brand, model, year, color, carType, price, mileage, fuelType, transmission, features, description, location, address, phone, email } = req.body;


        const files = req.files?.images || [];


        if (files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }


        const uploadPromises = files.map(file =>
            uploadToCloudinary(file.path, "cars")
        );

        const uploadedImages = await Promise.all(uploadPromises);
        const imageUrls = uploadedImages.map(img => img.secure_url);

        if (
            !carName ||
            !brand ||
            !model ||
            !year ||
            !color ||
            !carType ||
            !price ||
            !mileage ||
            !fuelType ||
            !transmission ||
            !location ||
            !phone ||
            !email ||
            !req.user?.id
        ) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const car = await CarModel.create({
            carName,
            brand,
            model,
            year,
            color,
            carType,
            price,
            mileage,
            fuelType,
            transmission,
            features,
            images: imageUrls,
            description,
            location,
            address,
            phone,
            email,
            seller: req.user.id,
            status: "Available"
        })

        const user = await User.findByIdAndUpdate(req.user.id,
            { $push: { listedCars: car._id } }, 
            { new: true });

        if (!user) {
            return res.status(400).json({ message: "user not found!" });
        }

        res.status(201).json({
            success: true,
            car: car,
            user: user
        })
    } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}