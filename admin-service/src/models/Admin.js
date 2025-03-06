// src/models/Admin.js

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    // Stored as plain text 
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
