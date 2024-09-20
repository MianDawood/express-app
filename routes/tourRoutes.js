const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.route('/')
  .get(tourController.getAllTours);

router.route('/create')
  .post(tourController.createTour); // Correctly call createTour

  router
  .route('/:id') // Define a route with the ID parameter
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)
  .get(tourController.singleTour);

module.exports = router;
