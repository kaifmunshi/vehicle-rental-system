// provider-service/src/routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
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

module.exports = router;
