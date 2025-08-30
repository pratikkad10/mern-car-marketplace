import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["Both", "Admin"], 
            default: "Both"          
        },
        profilePic: { type: String, default: "" },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
        phone: { type: String, required: true },

        listedCars: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Car" } // Cars listed by user
        ],

        buyedCars: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Car" } // Cars purchased by user
        ],

        wishlist: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Car" } // User wishlist cars
        ]
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
