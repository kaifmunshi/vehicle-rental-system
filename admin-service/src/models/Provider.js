const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  mobile: {
    type: String,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  document: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

// By default, Mongoose uses the pluralized model name ("providers")
module.exports = mongoose.model('Provider', ProviderSchema);
