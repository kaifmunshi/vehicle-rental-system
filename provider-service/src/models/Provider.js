const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Provider name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Provider email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
      },
      
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
    },
    images: {
      // Array of image URLs (or file paths) after upload.
      type: [String],
      default: [],
    },
    // You might want to include a field for a document (e.g., PDF) URL
    document: {
      type: String,
    },
    // Status field: provider starts as pending and later can be approved/rejected by admin.
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    // You can add other fields as needed. For example:
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Provider', ProviderSchema);
