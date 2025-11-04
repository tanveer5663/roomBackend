import mongoose from "mongoose";

const Mongourl = process.env.MONGO_URI; // must match .env variable

const mongoDB = async () => {
  try {
    await mongoose.connect(Mongourl);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
};

export default mongoDB;
// PORT=5000
// MONGO_URI=mongodb+srv://yadavbhavesh:12345@rooms.xeajzyr.mongodb.net/Rooms-Data?retryWrites=true&w=majority&appName=Rooms
// JWT_SECRET=your_jwt_secret_here
// JWT_EXPIRES_IN=7d
