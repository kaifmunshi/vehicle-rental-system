// provider-service/src/routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerProvider,
  loginProvider,
  getApprovedProviders,
} = require('../controllers/providerController');

// Endpoint for provider registration
router.post('/register', registerProvider);

// Endpoint for provider login
router.post('/login', loginProvider);

// Endpoint to fetch approved providers (for user display)
router.get('/approved', getApprovedProviders);

module.exports = router;
