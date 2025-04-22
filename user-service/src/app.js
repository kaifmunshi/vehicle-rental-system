// D:\vehicle-rental-project\user-service\src\app.js
const express = require('express');
const cors = require('cors'); // Require the cors package
const app = express();
const authRoutes = require('./routes/authRoutes');  // Existing auth routes
const profileRoutes = require('./routes/profileRoutes');  // Newly created protected routes
const publicRoutes = require('./routes/publicRoutes');

// Enable CORS for your frontend (http://localhost:3000)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // ✅ allow cookies
  }));
// Middleware to parse JSON bodies
app.use(express.json());

// Public routes for registration and login
app.use('/api/users', authRoutes);

// Protected route (profile)
app.use('/api/users', profileRoutes);

app.use('/api/public', publicRoutes);
module.exports = app;
