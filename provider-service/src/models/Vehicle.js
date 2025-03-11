// provider-service/src/models/Vehicle.js
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    type: {
      type: String,
      enum: ['2-wheeler', '4-wheeler'],
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    quantity: {
      type: Number,
      default: 1, // For example, how many vehicles of this type are available.
    },
    // Optional: Average rating field for the vehicle.
    averageRating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
