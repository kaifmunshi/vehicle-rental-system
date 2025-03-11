const express = require('express');
const router = express.Router();
const {
  addReview,
  getProviderReviews,
  getVehicleReviews,
  getAverageRatingForProvider
} = require('../controllers/reviewController');

// Route to add a review
router.post('/', addReview);

// Route to get reviews for a specific provider
router.get('/provider/:providerId', getProviderReviews);

// Route to get reviews for a specific vehicle
router.get('/vehicle/:vehicleId', getVehicleReviews);

// Route to get average rating for a provider
router.get('/provider/:providerId/average', getAverageRatingForProvider);

module.exports = router;
