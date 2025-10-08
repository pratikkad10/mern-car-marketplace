import mongoose from "mongoose";

const testDriveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    date: {
        type: String, 
        required: true
    },
    time: {
        type: String, 
        required: true
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true 
});

export default mongoose.model('TestDrive', testDriveSchema);
