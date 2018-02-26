const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
profileRouter.use(authController.isLoggedIn);

profileRouter.route('/:id')
  .get(profileController.findByUsername, viewsController.showUser)
  .put(profileController.findByUsername, authController.isUser, viewsController.showEdit);

module.exports = profileRouter;
