const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Protected route to get user profile data
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'User profile data',
    user: req.user,  // Contains the decoded token information
  });
});

module.exports = router;
