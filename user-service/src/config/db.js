// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use your local URI directly or an environment variable fallback
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vehicle-rental';

    // Note: `useNewUrlParser` and `useUnifiedTopology` are no longer necessary in Mongoose 6+
    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
