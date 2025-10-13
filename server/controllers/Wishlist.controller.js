import User from "../models/User.model.js";
import Car from "../models/Car.model.js";

export const addToWishlist = async (req, res) => {
    try {
        const { carId } = req.body;
        const userId = req.user._id;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        const user = await User.findById(userId);
        if (user.wishlist.includes(carId)) {
            return res.status(400).json({ message: "Car already in wishlist" });
        }

        user.wishlist.push(carId);
        await user.save();

        res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { carId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        user.wishlist = user.wishlist.filter(id => id.toString() !== carId);
        await user.save();

        res.status(200).json({ message: "Removed from wishlist", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate("wishlist");
        
        if (!user) {
            return res.status(404).json({ wishlist: [] });
        }
        
        res.status(200).json({ wishlist: user.wishlist || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
