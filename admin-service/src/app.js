const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Always set CORS BEFORE routes or anything else
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Your routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

module.exports = app;
