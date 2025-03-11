// admin-service/src/models/Vehicle.js
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
      default: 1,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    // Include the isDeleted field if you want to support soft deletes in analytics as well.
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
