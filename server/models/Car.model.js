import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
    {
        carName: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        carType: {
            type: String,
            enum: ["SUV", "Sedan", "Sports", "Luxury", "Electric"],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        fuelType: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
            required: true,
        },
        transmission: {
            type: String,
            enum: ["Manual", "Automatic", "Semi-Automatic", "CVT", "Other"],
            required: true,
        },
        features: {
            type: [String],
            default: [],
        },
        images: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        address: {
            type: Object, // structured object if needed from reverse geocoding
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Available", "Sold", "Pending"],
            default: "Available",
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
            default: null,
        },
        soldAt: { type: Date }, 
    },
    { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
