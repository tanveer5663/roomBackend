import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import propertyRoutes from "./routes/Propertyroutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import connectDB from "./db.js";

dotenv.config();

const app = express();
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Example routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
// const MONGO =
//   process.env.MONGO_URI ||
//   "mongodb+srv://yadavbhavesh:12345@rooms.xeajzyr.mongodb.net/Rooms-Data?retryWrites=true&w=majority&appName=Rooms";

// mongoose
//   .connect(MONGO)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to MongoDB:", err);
//   });

export default app;
