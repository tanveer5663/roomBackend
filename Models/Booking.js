import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  propertyName: { type: String, required: true },
  price: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
