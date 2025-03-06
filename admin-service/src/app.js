const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Import admin routes
const adminRoutes = require('./routes/adminRoutes');

// Use admin routes (prefix with /api/admin)
app.use('/api/admin', adminRoutes);

module.exports = app;
