const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/speedymeals', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection to MongoDB established!!');
  } catch (err) {
    console.error('Connection to MongoDB failed:', err);
    process.exit(1);
  }
};

module.exports = connectDB;