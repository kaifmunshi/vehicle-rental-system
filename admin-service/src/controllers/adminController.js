// admin-service/src/controllers/adminController.js

const Admin = require('../models/Admin');
const Provider = require('../models/Provider'); // Provider model from the providers collection
const Vehicle = require('../models/Vehicle');   // Vehicle model for analytics
const jwt = require('jsonwebtoken');

// Generate JWT token for admin
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Admin Login Controller
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare plain-text password (or use bcrypt if desired)
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({
      message: 'Admin logged in successfully',
      token: generateToken(admin),
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Pending Provider Requests Controller
exports.getPendingProviders = async (req, res) => {
  try {
    const pendingProviders = await Provider.find({ status: 'pending' });
    res.status(200).json({ message: 'Pending provider requests', providers: pendingProviders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching providers', error: error.message });
  }
};

// Update Provider Status (Approve or Reject)
exports.updateProviderStatus = async (req, res) => {
  const { providerId } = req.params;
  const { status } = req.body; // Expected value: 'approved' or 'rejected'

  // Validate the status value
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value. Must be "approved" or "rejected".' });
  }

  try {
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    provider.status = status;
    await provider.save();
    res.status(200).json({ message: `Provider status updated to ${status}`, provider });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating provider status', error: error.message });
  }
};

// Analytics Endpoint: Aggregate system-wide stats
exports.getAnalytics = async (req, res) => {
  try {
    // Provider counts
    const totalProviders = await Provider.countDocuments();
    const approvedProviders = await Provider.countDocuments({ status: 'approved' });
    const pendingProviders = await Provider.countDocuments({ status: 'pending' });
    const rejectedProviders = await Provider.countDocuments({ status: 'rejected' });
    
    // Vehicle counts (only non-deleted ones)
    const totalVehicles = await Vehicle.countDocuments({ isDeleted: false });
    const twoWheelers = await Vehicle.countDocuments({ type: '2-wheeler', isDeleted: false });
    const fourWheelers = await Vehicle.countDocuments({ type: '4-wheeler', isDeleted: false });
    
    res.status(200).json({
      message: 'Analytics fetched successfully',
      data: {
        providers: {
          total: totalProviders,
          approved: approvedProviders,
          pending: pendingProviders,
          rejected: rejectedProviders,
        },
        vehicles: {
          total: totalVehicles,
          twoWheelers,
          fourWheelers,
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};
