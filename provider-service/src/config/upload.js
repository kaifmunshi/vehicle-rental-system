// Import multer
const multer = require('multer');

// Configure the storage engine
const storage = multer.diskStorage({
  // Specify the destination folder for uploaded files
  destination: function(req, file, cb) {
    // 'uploads/' folder will store all uploaded files; create this folder in your provider-service folder
    cb(null, 'uploads/');
  },
  // Configure the filename format for uploaded files
  filename: function(req, file, cb) {
    // Generate a unique suffix using the current timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Use the original file name with the unique suffix prepended
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Create the Multer instance using the storage configuration
const upload = multer({ storage: storage });

// Export the configured multer instance for use in routes
module.exports = upload;
