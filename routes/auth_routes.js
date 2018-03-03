const express = require('express');
const authRouter = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');

authRouter.route('/register')
  .get(viewsController.showRegister)
  .post(authController.checkNewUser, profileController.save,
            profileController.getAllUsers, friendController.getNonFriends,
              viewsController.showNewUser);

authRouter.route('/login')
  .post(authController.authenticate, profileController.getAllUsers,
            friendController.getNonFriends, friendController.getPendingFriends,
              friendController.findPending, postController.getYourPosts, likeController.getLikes,
                    viewsController.showUser);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
