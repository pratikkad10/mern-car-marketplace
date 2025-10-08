import mongoose from "mongoose";

const interestedUserSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId, // references the Car model
      ref: "Car",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      default: null,
    },
    sellerName: {
      type: String,
      required: true,
      trim: true,
    },
    sellerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },
    buyerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: false,
      trim: true,
    },
    sentAt: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("InterestedUser", interestedUserSchema);
