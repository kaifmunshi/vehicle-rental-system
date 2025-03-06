const express = require('express');
const app = express();

// Middleware: Parse JSON bodies
app.use(express.json());

// Middleware: For file uploads using multer, you might add additional configuration here later

// Import provider routes
const providerRoutes = require('./routes/providerRoutes');
app.use('/api/provider', providerRoutes);

module.exports = app;
