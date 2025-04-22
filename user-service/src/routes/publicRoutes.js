// D:\vehicle-rental-project\user-service\src\routes\publicRoutes.js

const express = require('express');
const router = express.Router();

// Load Provider and Vehicle models from provider-service
const Provider = require('../models/Provider');
const Vehicle = require('../models/Vehicle');

// ✅ Route 1: Get all unique cities where approved providers exist
// GET /api/public/cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await Provider.distinct('city', { status: 'approved' });

    // Remove empty/null entries just in case
    const filteredCities = cities.filter(city => city && city.trim() !== '');

    res.status(200).json({ cities: filteredCities });
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ message: 'Failed to fetch cities', error: err.message });
  }
});

// ✅ Route 2: Get all vehicles from approved providers in the selected city
// GET /api/public/vehicles-by-city/:city
router.get('/vehicles-by-city/:city', async (req, res) => {
  const city = req.params.city;

  try {
    // 1. Get all approved providers from that city
    const providers = await Provider.find({ city, status: 'approved' });

    if (!providers || providers.length === 0) {
      return res.status(200).json([]); // No providers in selected city
    }

    const providerIds = providers.map(p => p._id);

    // 2. Get all vehicles from these providers (excluding soft-deleted)
    const vehicles = await Vehicle.find({
      provider: { $in: providerIds },
      isDeleted: false
    }).populate('provider', 'name address city mobile');
    // Pull provider info

    res.status(200).json(vehicles);
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).json({ message: 'Failed to fetch vehicles', error: err.message });
  }
});

module.exports = router;
