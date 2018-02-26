const express = require('express');
const authRouter = express.Router();
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const profileController = require('../controllers/profile_Controller');

authRouter.route('/register')
  .get(viewsController.showRegister)
  .post(authController.checkUser, profileController.save, viewsController.showUser);

authRouter.route('/login')
  .post(authController.authenticate, viewsController.showUser);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
