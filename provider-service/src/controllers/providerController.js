// provider-service/src/controllers/providerController.js

const Provider = require('../models/Provider');
const bcrypt = require('bcrypt');        // <-- Import bcrypt
const jwt = require('jsonwebtoken');

// Function to generate a JWT token for a provider
const generateToken = (provider) => {
  return jwt.sign(
    { id: provider._id, email: provider.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Registration Endpoint
exports.registerProvider = async (req, res) => {
  try {
    const { name, email, password, city, address, mobile, description } = req.body;

    // Check if a provider with the same email already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: 'Provider with this email already exists' });
    }

    // Hash the plain-text password
    const saltRounds = 10; // You can choose a different cost factor
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new provider with the hashed password
    const provider = new Provider({
      name,
      email,
      password: hashedPassword, // Stored as a bcrypt hash
      city,
      address,
      mobile,
      description,
      images: req.body.images || [],
      document: req.body.document || "",
    });

    await provider.save();

    res.status(201).json({
      message: 'Provider registered successfully. Awaiting admin approval.',
      provider: { id: provider._id, email: provider.email, status: provider.status },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// Login Endpoint
exports.loginProvider = async (req, res) => {
  const { email, password } = req.body;
  try {
    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the plain-text password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provider has been approved by an admin
    if (provider.status !== 'approved') {
      return res.status(403).json({ message: 'Provider not approved by admin yet' });
    }

    const token = generateToken(provider);
    res.status(200).json({
      message: 'Provider logged in successfully',
      token,
      provider: { id: provider._id, email: provider.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// Endpoint to Get Approved Providers (for user display)
exports.getApprovedProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ status: 'approved' });
    res.status(200).json({ message: 'Approved providers', providers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching approved providers', error: error.message });
  }
};

// Endpoint to Get Rejected Providers
exports.getRejectedProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ status: 'rejected' });
    res.status(200).json({ message: 'Rejected providers', providers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rejected providers', error: error.message });
  }
};
