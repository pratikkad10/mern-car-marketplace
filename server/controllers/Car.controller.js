import CarModel from "../models/Car.model.js";
import IntrestedModel from "../models/Intrested.model.js";
import TestdriveModel from "../models/Testdrive.model.js";
import User from "../models/User.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


export const getCars = async (req, res) => {
    try {
        const cars = await CarModel.find().populate("seller", "-password")
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

export const deleteCar = async (req, res) => {
    try {
        const { carId } = req.body;

        if (!carId) {
            return res.status(400).json({
                success: false,
                message: "Car ID is required",
            });
        }

        const car = await CarModel.findByIdAndDelete(carId)

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.status(200).json({
            success: true,
            car: car
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const interestedCar = async (req, res) => {
    try {
        const {
            carId,
            sellerId,
            sellerName,
            sellerPhone,
            buyerName,
            buyerPhone,
            message
        } = req.body;

        if (!carId || !sellerName || !sellerPhone || !buyerName || !buyerPhone) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const car = await CarModel.findById(carId);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car is not present in the database",
            });
        }

        const newInterest = await IntrestedModel.create({
            carId,
            sellerId: sellerId || null, // optional
            sellerName,
            sellerPhone,
            buyerName,
            buyerPhone,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Interest recorded successfully",
            data: newInterest,
        });
    } catch (error) {
        console.error("Error saving interested user:", error);
        res.status(500).json({
            success: false,
            message: "Error saving interested user",
            error: error.message,
        });
    }
};

export const getInterestedCars = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const interestedCars = await IntrestedModel.find({ sellerId })
            .populate("carId") // optional: populates car details
            .sort({ createdAt: -1 }); // newest first

        res.status(200).json({
            success: true,
            interestedCars: interestedCars
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const createTestDrive = async (req, res) => {
    try {
        const {
            name,
            carId,
            phone,
            email,
            date,
            time,
            notes  // notes detail is an optional
        } = req.body;

        if (!name || !carId || !req.user.id || !phone || !email || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const newTestDrive = await TestdriveModel.create({
            name,
            car:carId,
            user:req.user.id,
            phone,
            email,
            date,
            time,
            notes
        });

        res.status(201).json({
            success: true,
            message: "Test drive scheduled successfully",
            data: newTestDrive,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const getTestDrive = async (req, res) => {
    try {
        const userId = req.user.id;
        const testDrives = await TestdriveModel.find({ user: userId })
            .populate("car") 
            .sort({ createdAt: -1 }); 

        res.status(200).json({
            success: true,
            testDrives: testDrives
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const getAllTestDrive = async (req, res) => {
  try {
    const allTestDrives = await TestdriveModel.find()
      .populate("car user") 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: allTestDrives.length,
      testDrives: allTestDrives,
    });
  } catch (error) {
    console.error("Error fetching all test drives:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch test drives",
      error: error.message,
    });
  }
};
