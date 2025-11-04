import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* ✅ Create a new booking (Book Now button) */
router.post("/book", async (req, res) => {
  try {
    const { userId, propertyId, propertyName, price } = req.body;

    // check if already booked
    const existingBooking = await Booking.findOne({ propertyId });
    if (existingBooking) {
      return res.status(400).json({ message: "Property already booked" });
    }

    const newBooking = new Booking({
      userId,
      propertyId,
      propertyName,
      price,
    });

    await newBooking.save();
    res.status(201).json({ message: "✅ Property booked successfully!" });
  } catch (err) {
    console.error("❌ Booking failed:", err);
    res.status(500).json({ message: "Server error while booking property" });
  }
});

/* ✅ Cancel a booking (Unbook button) */
router.delete("/unbook/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    const deletedBooking = await Booking.findOneAndDelete({ propertyId });
    if (!deletedBooking) {
      return res.status(404).json({ message: "No booking found for this property" });
    }

    res.json({ message: "✅ Property is unbooked successfully!" });
  } catch (err) {
    console.error("❌ Unbooking Error:", err);
    res.status(500).json({ message: "Server error while unbooking property" });
  }
});

/* ✅ Get all bookings (optional - for admin or testing) */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("propertyId userId");
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
});

export default router;
