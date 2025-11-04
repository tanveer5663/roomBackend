import express from "express";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example routes
app.get("/", (req, res) => {
  res.send("Welcome to my simple Node.js API 🚀");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js API!" });
});

const PORT = process.env.PORT || 5000;

// Start server (only for local testing)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // <-- Important for Vercel
