import express from "express";
import cors from "cors";




import authRoutes from "./Routes/authRoutes.js";
import protectedRoutes from "./Routes/protectedRoutes.js";
import propertyRoutes from "./Routes/Propertyroutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
import connectDB from "./db.js";



const app = express();
 await connectDB();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Example routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

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
