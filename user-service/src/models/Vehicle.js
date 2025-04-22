// user-service\src\models\Vehicle.js
const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider", // ✅ Make sure this matches your Provider model name exactly
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
      default: 1,
    },
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

// ✅ Index to enable text-based search on vehicle names
VehicleSchema.index({ name: "text" });

module.exports = mongoose.model("Vehicle", VehicleSchema);
