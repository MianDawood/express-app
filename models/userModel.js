// User model file placeholder
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  designation:{type:String,required:false},
  cnic:{type:String,required:false},
  fathername:{type:String,required:false},
  hobbies: {
    type: [String], // Array of strings for hobbies
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;