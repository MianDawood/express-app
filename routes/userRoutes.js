// User routes file placeholder
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
  .get(userController.getAllUsers);

router.route('/create')
  .post(userController.createUser); // Correctly call createTour

  router
  .route('/:id') // Define a route with the ID parameter
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.singleUser);

module.exports = router;