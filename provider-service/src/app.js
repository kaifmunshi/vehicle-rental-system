// provider-service/src/app.js
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import provider routes
const providerRoutes = require('./routes/providerRoutes');
app.use('/api/provider', providerRoutes);

// Import vehicle routes
const vehicleRoutes = require('./routes/vehicleRoutes');
app.use('/api/vehicles', vehicleRoutes);


// New review routes
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);


module.exports = app;
