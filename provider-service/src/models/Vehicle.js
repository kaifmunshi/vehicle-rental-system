// provider-service/src/models/Vehicle.js
const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    type: {
      type: String,
      enum: ["2-wheeler", "4-wheeler"],
      required: true,
    },
    name: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      default: 1, // Number of available vehicles
    },
    averageRating: {
      type: Number,
      default: 0, // Optional rating field
    },
    isDeleted: {
      type: Boolean,
      default: false, // Soft delete functionality
    }
  },
  { timestamps: true }
);

// Index for optimizing search queries on vehicle name
VehicleSchema.index({ name: "text" });

module.exports = mongoose.model("Vehicle", VehicleSchema);
