import express from "express";
import Booking from "../Models/Booking.js";
import Property from "../Models/Property.js"; // ✅ important import
import User from "../Models/User.js"; // ✅ to populate student info

const router = express.Router();

/* ✅ Create a new booking (Book Now button) */
router.post("/book", async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    if (!userId || !propertyId) {
      return res
        .status(400)
        .json({ message: "Missing studentId or propertyId" });
    }

    // check if property already booked
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.booked) {
      return res.status(400).json({ message: "Property already booked" });
    }

    // create booking record
    const newBooking = await Booking.create({
      userId,
      propertyId,
      ownerId: property.ownerId,
    });

    // mark property as booked
    property.booked = true;
    property.bookedBy = userId;

    await property.save();

    res
      .status(201)
      .json({ message: "Property booked successfully", newBooking });
  } catch (err) {
    console.error("❌ Booking error:", err);
    res.status(500).json({ message: "Server error during booking" });
  }
});

/* ✅ Cancel a booking (Unbook button) */
router.delete("/unbook/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    // delete booking
    const deletedBooking = await Booking.findOneAndDelete({ propertyId });
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: "No booking found for this property" });
    }

    // mark property as available again
    await Property.findByIdAndUpdate(propertyId, {
      booked: false,
      bookedBy: null,
    });

    res.json({ message: "Property unbooked successfully" });
  } catch (err) {
    console.error("❌ Unbooking error:", err);
    res.status(500).json({ message: "Server error while unbooking" });
  }
});

/* ✅ Get all bookings for a specific owner */
router.get("/owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;

  try {
    if (!ownerId || ownerId === "undefined") {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    // find all properties owned by this owner
    const ownerProperties = await Property.find({ ownerId }).select("_id");
    if (!ownerProperties.length) {
      return res.json([]); // no properties = no bookings
    }

    const propertyIds = ownerProperties.map((p) => p._id);

    // find bookings for those properties
    const bookings = await Booking.find({ propertyId: { $in: propertyIds } })
      .populate("propertyId", "name location rent image type")
      .populate("userId", "name email");

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching owner bookings:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching owner bookings" });
  }
});

/* ✅ Get all bookings (admin or debug route) */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("propertyId", "name rent location")
      .populate("userId", "name email");
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching all bookings:", err);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
});

export default router;
