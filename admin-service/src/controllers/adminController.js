// adminController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For plain text password comparison (if that’s what you're using):
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(admin);

    // Return token to client
    return res.status(200).json({
      message: 'Admin logged in successfully',
      token,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Protected Route Example
exports.getPendingProviders = async (req, res) => {
  // If adminProtect worked, req.admin is set
  // Return dummy data or actual provider data
  const dummyProviders = [
    { id: 'provider1', name: 'Provider One', status: 'pending' },
    { id: 'provider2', name: 'Provider Two', status: 'pending' },
  ];
  res.status(200).json({ message: 'Pending provider requests', providers: dummyProviders });
};
