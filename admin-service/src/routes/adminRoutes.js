// adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminProtect } = require('../middleware/adminProtect'); // import the middleware
const {
  loginAdmin,
  getPendingProviders
} = require('../controllers/adminController');

// Public route: Admin login (no token required)
router.post('/login', loginAdmin);

// Protected route: Only accessible if the request has a valid token
router.get('/providers/pending', adminProtect, getPendingProviders);

module.exports = router;
