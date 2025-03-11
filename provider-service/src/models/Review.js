const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    // The user who submitted the review
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Reviewer is required'],
    },
    // Optional: Reference to the provider being reviewed
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
    },
    // Optional: Reference to the vehicle being reviewed
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
