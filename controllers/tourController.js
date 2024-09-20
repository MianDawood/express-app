const { query } = require('express');
const Tour = require('../models/tourModel');

// Get all tours
exports.getAllTours = async (req, res) => {
  try {

    queryObj = {...req.query};
    removeFields = ['sort','limit','sort'];
    removeFields.forEach(element => delete queryObj[element]);
   let query = Tour.find(queryObj);
  
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
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Failed to fetch tours' });
  }
};

// Create a new tour
exports.createTour = async (req, res) => {  // Fixed parameter order
  try {
    // const newTour = await Tour.create({
    //   name: 'test',
    //   duration: 5,
    //   price: 10
    // });
    const newTour = await Tour.create(req.body);
console.log(req.body.name);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Failed to create tour' });
  }
};


exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Returns the updated document
      runValidators: true, // Runs schema validators on the update
    });

    if (!updatedTour) {
      return res.status(404).json({
        status: 'fail',
        message: 'No tour found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};


exports.deleteTour = async (req, res) => {
  try {
   await Tour.findByIdAndDelete(req.params.id);

    if (!req.params.id) {
      return res.status(404).json({
        status: 'fail',
        message: 'No tour found with that ID',
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



exports.singleTour = async (req, res) => {
  try {
   const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'No tour found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
       tour:tour
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

