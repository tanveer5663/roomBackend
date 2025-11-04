import express from "express";
import Property from "../Models/Property.js";

const router = express.Router();

// Fetch all properties of a given type
router.get("/:type", async (req, res) => {
  try {
    const type = req.params.type.toLowerCase();
    const properties = await Property.find({ type });
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get property by ID
router.get("/details/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/book/:id", async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      { booked: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property booked successfully", property: updated });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
});


// Add sample properties (temporary route for testing)
router.post("/add-sample", async (req, res) => {
  try {
    const sampleData = [
      {
        name: "Sunshine Hostel",
        location: "Indore",
        rent: 4500,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        owner: "Rahul Mehta",
        type: "hostel",
      },
      {
        name: "Comfort PG",
        location: "Bhopal",
        rent: 5500,
        image: "https://images.unsplash.com/photo-1560448075-bb485b067938",
        owner: "Priya Sharma",
        type: "pg",
      },
      {
        name: "Elite Apartments",
        location: "Ujjain",
        rent: 12000,
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        owner: "Amit Singh",
        type: "flat",
      },
      {
        name: "Home Mess Service",
        location: "Gwalior",
        rent: 2500,
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
        owner: "Sneha Patel",
        type: "mess",
      },
      {
    name: "Sunrise Hostel",
    location: "Bhopal, MP",
    rent: 4500,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    type: "hostel",
    owner: "Ravi Sharma"
  },
  {
    name: "Comfort PG",
    location: "Indore, MP",
    rent: 6000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    type: "pg",
    owner: "Aman Verma"
  },
  {
    name: "Royal Flat",
    location: "Pune, Maharashtra",
    rent: 12000,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    type: "flat",
    owner: "Neha Gupta"
  },
  {
    name: "Homely Mess",
    location: "Jaipur, Rajasthan",
    rent: 3500,
    image: "https://images.unsplash.com/photo-1556910103-1c27aaf2b1d5",
    type: "mess",
    owner: "Sandeep Singh"
  }
    ];

    await Property.insertMany(sampleData);
    res.json({ message: "✅ Sample properties added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add sample properties" });
  }
});

export default router;
