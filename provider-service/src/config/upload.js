const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Generalized storage engine creator
const createStorage = (folderName) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const folderPath = path.join(__dirname, '../uploads/', folderName);

      // Ensure the directory exists
      fs.mkdirSync(folderPath, { recursive: true });

      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });

// Multer upload handlers
const uploadDocument = multer({ storage: createStorage('documents') });
const uploadImages = multer({ storage: createStorage('images') });

module.exports = {
  uploadDocument,
  uploadImages,
};
