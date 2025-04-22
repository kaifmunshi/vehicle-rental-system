require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // ✅ Import cors

const app = express();

// ✅ Enable CORS for frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();
// addded for frontend
const path = require("path");

// 👇 Serve static files from /uploads (for images & documents)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const vehicleRoutes = require("./routes/vehicleRoutes");
const providerRoutes = require("./routes/providerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Register Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/provider", uploadRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/reviews", reviewRoutes);


// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ Provider Service running on port ${PORT}`);
});
