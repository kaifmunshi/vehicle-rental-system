// provider-service/src/routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const Vehicle = require("../models/Vehicle"); 
const {
  addVehicle,
  updateVehicle,
  softDeleteVehicle,
  getVehiclesByProvider,
} = require('../controllers/vehicleController');

// Route to add a new vehicle
router.post('/', addVehicle);

// Route to update an existing vehicle (by vehicle id)
router.put('/:id', updateVehicle);

// Route to delete a vehicle (by vehicle id)
router.delete('/:id', softDeleteVehicle);

// Route to get vehicles for a specific provider (by provider id)
router.get('/provider/:providerId', getVehiclesByProvider);

// Search Vehicles by Name
router.get("/search", async (req, res) => {
  try {
      const { query } = req.query;
      if (!query) {
          return res.status(400).json({ message: "Query parameter is required" });
      }

      const vehicles = await Vehicle.find({ name: { $regex: query, $options: "i" } });
      res.status(200).json(vehicles);
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// GET /api/vehicles/price?minPrice=100&maxPrice=200
router.get('/price', async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    // Convert query params to numbers
    const numericMinPrice = parseFloat(minPrice);
    const numericMaxPrice = parseFloat(maxPrice);

    // Validate numeric values (optional, but recommended)
    if (isNaN(numericMinPrice) || isNaN(numericMaxPrice)) {
      return res.status(400).json({ message: 'Invalid minPrice or maxPrice' });
    }

    // Find vehicles with price in the given range
    const vehicles = await Vehicle.find({
      price: {
        $gte: numericMinPrice,
        $lte: numericMaxPrice
      }
    });

    // Return the filtered vehicles
    res.status(200).json({
      message: 'Vehicles filtered by price range successfully',
      data: vehicles
    });
  } catch (error) {
    console.error('Error fetching vehicles by price range:', error);
    res.status(500).json({
      message: 'Error fetching vehicles by price range',
      error: error.message
    });
  }
});
module.exports = router;
