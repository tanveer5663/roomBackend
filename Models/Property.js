// models/Property.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    rent: Number,
    image: String,
    type: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booked: { type: Boolean, default: false },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
