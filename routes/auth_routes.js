const express = require('express');
const authRouter = express.Router();
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const profileController = require('../controllers/profile_Controller');
const friendController = require('../controllers/friend_Controller');
const postController = require('../controllers/post_Controller');

authRouter.route('/register')
  .get(viewsController.showRegister)
  .post(authController.checkNewUser, profileController.save, profileController.getAllUsers, friendController.getNonFriends, viewsController.showNewUser);

authRouter.route('/login')
  .post(authController.authenticate, profileController.getAllUsers, friendController.getNonFriends, friendController.getPendingFriends, friendController.findPending, postController.getYourPosts, viewsController.showUser);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
