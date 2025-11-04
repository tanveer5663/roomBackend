import mongoose from "mongoose";

let isConnected = false;
const MONGO =
  process.env.MONGO_URI ||
  "mongodb+srv://yadavbhavesh:12345@rooms.xeajzyr.mongodb.net/Rooms-Data?retryWrites=true&w=majority&appName=Rooms";

const connectDB = async () => {
  if (isConnected) return; // Prevent multiple connections
  try {
    await mongoose.connect(MONGO);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
