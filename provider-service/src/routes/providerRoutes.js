const express = require('express');
const router = express.Router();
const {
  registerProvider,
  loginProvider,
  getApprovedProviders,
} = require('../controllers/providerController');

// Import Multer configuration
const upload = require('../config/upload');
// Existing provider endpoints
router.post('/register', registerProvider);
router.post('/login', loginProvider);
router.get('/approved', getApprovedProviders);

// New endpoint: Upload legal document (PDF) for provider verification
// The field name in form-data should be "document"
router.post('/upload/document', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type. Only PDF files are allowed.' });
  }
  res.status(200).json({
    message: 'Document uploaded successfully',
    file: req.file, // Contains file details (filename, path, size, etc.)
  });
});

module.exports = router;
