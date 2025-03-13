require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import routes
const vehicleRoutes = require("./routes/vehicleRoutes");
const providerRoutes = require("./routes/providerRoutes");  //  Added provider routes
const reviewRoutes = require('./routes/reviewRoutes');
// Register Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/provider", providerRoutes);  //  Register provider routes
// If you want your routes to be accessible under /api/reviews
app.use('/api/reviews', reviewRoutes);
// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`✅ Provider Service running on port ${PORT}`);
});
