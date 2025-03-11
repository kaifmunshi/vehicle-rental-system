// provider-service/src/controllers/vehicleController.js

const Vehicle = require('../models/Vehicle');

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const { providerId, type, name, price, quantity } = req.body;
    
    // Validate required fields
    if (!providerId || !type || !name || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const vehicle = new Vehicle({
      provider: providerId,
      type,
      name,
      price,
      quantity: quantity || 1,
    });

    await vehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
};

// Update an existing vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle updated successfully', updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};

// Soft delete a vehicle (mark as deleted)
exports.softDeleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.isDeleted = true;
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle marked as deleted', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};

// Restore a soft-deleted vehicle
exports.restoreVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle || !vehicle.isDeleted) {
      return res.status(404).json({ message: 'Vehicle not found or not deleted' });
    }

    vehicle.isDeleted = false;
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle restored successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error restoring vehicle', error: error.message });
  }
};

// Get all vehicles with pagination & sorting
exports.getAllVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;

    const vehicles = await Vehicle.find({ isDeleted: false })
      .sort({ [sortBy]: sortOrder })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.status(200).json({ message: 'Vehicles fetched successfully', vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle || vehicle.isDeleted) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle fetched successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
  }
};

// Get vehicles by provider
exports.getVehiclesByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const vehicles = await Vehicle.find({ provider: providerId, isDeleted: false });
    res.status(200).json({ message: 'Vehicles fetched successfully', vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

// Get vehicles by type
exports.getVehiclesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const vehicles = await Vehicle.find({ type, isDeleted: false });
    res.status(200).json({ message: 'Vehicles fetched successfully', vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

// Search vehicles by name
exports.searchVehicles = async (req, res) => {
  try {
    const { query } = req.query;
    const vehicles = await Vehicle.find({ name: { $regex: query, $options: 'i' }, isDeleted: false });
    res.status(200).json({ message: 'Search results', vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error searching vehicles', error: error.message });
  }
};

// Filter vehicles by price range
exports.getVehiclesByPriceRange = async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = Number.MAX_VALUE } = req.query;
    const vehicles = await Vehicle.find({
      price: { $gte: minPrice, $lte: maxPrice },
      isDeleted: false,
    });
    res.status(200).json({ message: 'Vehicles filtered successfully', vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Error filtering vehicles', error: error.message });
  }
};

// Update vehicle quantity
exports.updateVehicleQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityChange } = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle || vehicle.isDeleted) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.quantity += quantityChange;
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle quantity updated successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle quantity', error: error.message });
  }
};
