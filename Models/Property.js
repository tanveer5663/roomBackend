// models/Property.js
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: String,
  location: String,
  rent: Number,
  image: String,
  type: String,
  owner: String,
  booked: { type: Boolean, default: false }
});

export default mongoose.model("Property", propertySchema);
