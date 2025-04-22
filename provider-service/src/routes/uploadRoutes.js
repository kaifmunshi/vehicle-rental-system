//D:\vehicle-rental-project\provider-service\src\routes\uploadRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { uploadDocument, uploadImages } = require('../config/upload');// 👈 matches the updated upload.js

// Serve uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// 👉 POST: Upload a document
router.post('/upload/document', uploadDocument.single('document'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No document uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/documents/${req.file.filename}`;
  res.status(200).json({
    success: true,
    message: 'Document uploaded successfully',
    fileUrl, // ✅ Include this in response
    file: req.file });
  
});

// 👉 POST: Upload multiple images
router.post('/upload/images', uploadImages.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No images uploaded' });

  const fileUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/images/${file.filename}`);
res.status(200).json({ success: true, fileUrls });

});

module.exports = router;
