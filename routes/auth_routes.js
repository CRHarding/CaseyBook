const express = require('express');
const authRouter = express.Router();
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const profileController = require('../controllers/profile_Controller');
const friendController = require('../controllers/friend_Controller');

authRouter.route('/register')
  .get(viewsController.showRegister)
  .post(authController.checkNewUser, profileController.save, profileController.getAllUsers, viewsController.showUser);

authRouter.route('/login')
  .post(authController.authenticate, friendController.getNonFriends, friendController.getPendingFriends, viewsController.showUser);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
