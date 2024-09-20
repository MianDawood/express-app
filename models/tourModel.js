const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  manager:{type:String,required:false}
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
