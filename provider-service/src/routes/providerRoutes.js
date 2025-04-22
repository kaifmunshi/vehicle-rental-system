// D:\vehicle-rental-project\provider-service\src\routes\providerRoutes.js

const express = require('express');
const router = express.Router();

const {
  registerProvider,
  loginProvider,
  getApprovedProviders,
  getRejectedProviders, // ✅ New controller added
} = require('../controllers/providerController');

const { uploadDocument } = require('../config/upload'); // Multer config for document upload

// ✅ Provider registration & login
router.post('/register', registerProvider);
router.post('/login', loginProvider);

// ✅ Approved & Rejected provider listings
router.get('/approved', getApprovedProviders);
router.get('/rejected', getRejectedProviders); // ✅ New route added

// ✅ Upload document for provider verification (PDF)
router.post('/upload/document', uploadDocument.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type. Only PDF files are allowed.' });
  }

  res.status(200).json({
    message: 'Document uploaded successfully',
    file: req.file,
  });
});

module.exports = router;
