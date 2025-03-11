const express = require('express');
const router = express.Router();
const { loginAdmin, getPendingProviders, updateProviderStatus, getAnalytics } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminProtect');

// Admin login endpoint (public)
router.post('/login', loginAdmin);

// Protected endpoint: View pending provider requests
router.get('/providers/pending', adminProtect, getPendingProviders);

// Protected endpoint: Update provider status (approve/reject)
router.post('/providers/:providerId/status', adminProtect, updateProviderStatus);

// New: Protected endpoint to get analytics data
router.get('/analytics', adminProtect, getAnalytics);

module.exports = router;
