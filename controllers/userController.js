// User controller file placeholder
const { query } = require('express');
const User = require('../models/userModel');

// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    queryObj = {...req.query};
    removeFields = ['sort','limit','sort'];
    removeFields.forEach(element => delete queryObj[element]);
   let query = User.find(queryObj);
   //sorting
   if(req.query.sort)
{
   const sort = req.query.sort.split(',').join(' ');
   query = query.sort(sort);
}

//fields display
if(req.query.fields)
{
  const fields = req.query.fields.split(',').join(' ');
  query = query.select(fields);
}

//pagenation //
if(req.query.page){

const page = req.query.page * 1;
const limit = req.query.limit * 1 || 100; 
const skip = (page -1 ) * limit;

query = query.skip(skip).limit(limit);


}
    const users = await query;

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Failed to fetch tours' });
  }
};

// Create a new tour
exports.createUser = async (req, res) => {  // Fixed parameter order
  try {
    // const newTour = await Tour.create({
    //   name: 'test',
    //   duration: 5,
    //   price: 10
    // });
    const newUser = await User.create(req.body);
console.log(req.body.name);
    res.status(201).json({
      status: 'Success',
      data: {
        User: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Failed to create tour' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the updated document
      runValidators: true, // Runs schema validators on the update
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'No User found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        User: updatedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
   await User.findByIdAndDelete(req.params.id);

    if (!req.params.id) {
      return res.status(404).json({
        status: 'fail',
        message: 'No User found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
       
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};



exports.singleUser = async (req, res) => {
  try {
   const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user:user
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

