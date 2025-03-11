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
      provider,  // Optional: include provider ID if reviewing a provider
      vehicle,   // Optional: include vehicle ID if reviewing a vehicle
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
    const reviews = await Review.find({ provider: providerId });
    res.status(200).json({ message: 'Provider reviews fetched successfully', reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get reviews for a specific vehicle
exports.getVehicleReviews = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const reviews = await Review.find({ vehicle: vehicleId });
    res.status(200).json({ message: 'Vehicle reviews fetched successfully', reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Compute average rating for a provider
exports.getAverageRatingForProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await Review.aggregate([
      { $match: { provider: providerId } },
      { $group: {
          _id: '$provider',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
      } }
    ]);
    res.status(200).json({ message: 'Average rating computed successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error computing average rating', error: error.message });
  }
};
