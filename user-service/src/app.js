const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');  // Existing auth routes
const profileRoutes = require('./routes/profileRoutes');  // Newly created protected routes

// Middleware to parse JSON bodies
app.use(express.json());

// Public routes for registration and login
app.use('/api/users', authRoutes);

// Protected route (profile)
app.use('/api/users', profileRoutes);

module.exports = app;
