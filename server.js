require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const portfinder = require('portfinder');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB =require('./config/db')

const app = express();
app.use(express.json());
connectDB(); 

app.use('/api/v1/tours', tourRoutes);
//app.use('/api/v1/users', userRoutes);


portfinder.getPort((err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
