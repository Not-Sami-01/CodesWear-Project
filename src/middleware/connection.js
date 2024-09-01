const mongoose = require('mongoose');

const connectDB = handler => async (req, res) => {
  // Check if the database is not already connected
  if (mongoose.connection.readyState !== 1) { // 1 means connected
    try {
      await mongoose.connect(process.env.MONGO_DB_URI);
      console.log('Connection was successful')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  // Proceed with handling the request
  return handler(req, res);
};

export default connectDB;
