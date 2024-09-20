const mongoose = require('mongoose');
const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
