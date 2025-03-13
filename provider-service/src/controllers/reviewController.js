const mongoose = require('mongoose');
const Review = require('../models/Review');

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment, reviewedBy, provider, vehicle } = req.body;

    // Validate required fields
    if (!rating || !reviewedBy) {
      return res.status(400).json({ message: 'Rating and reviewer are required' });
    }

    // Create a new review document
    const review = new Review({
      rating,
      comment,
      reviewedBy,
      provider: provider ? new mongoose.Types.ObjectId(provider) : null,
      vehicle: vehicle ? new mongoose.Types.ObjectId(vehicle) : null,
    });

    await review.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

// Get reviews for a specific provider
exports.getProviderReviews = async (req, res) => {
  try {
    const { providerId } = req.params;
    const objectIdProviderId = new mongoose.Types.ObjectId(providerId);

    const reviews = await Review.find({ provider: objectIdProviderId });

    res.status(200).json({ message: 'Provider reviews fetched successfully', reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get reviews for a specific vehicle
exports.getVehicleReviews = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const objectIdVehicleId = new mongoose.Types.ObjectId(vehicleId);

    const reviews = await Review.find({ vehicle: objectIdVehicleId });

    res.status(200).json({ message: 'Vehicle reviews fetched successfully', reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Compute average rating for a provider
exports.getAverageRatingForProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const objectIdProviderId = new mongoose.Types.ObjectId(providerId);

    const result = await Review.aggregate([
      { $match: { provider: objectIdProviderId } }, // Fix: Ensure providerId is an ObjectId
      { $group: {
          _id: '$provider',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
      } }
    ]);

    if (result.length === 0) {
      return res.status(200).json({ message: 'No reviews found for this provider', data: null });
    }

    res.status(200).json({ message: 'Average rating computed successfully', data: result[0] });
  } catch (error) {
    console.error('Error computing average rating:', error);
    res.status(500).json({ message: 'Error computing average rating', error: error.message });
  }
};
