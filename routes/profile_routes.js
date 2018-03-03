const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');
const likesController = require('../controllers/likeController');

profileRouter.use(authController.isLoggedIn);

profileRouter.route('/')
  .get(profileController.getAllUsers, viewsController.showHome);

profileRouter.route('/myProfile')
  .get(friendController.getPendingFriends, friendController.getNonFriends,
          friendController.findPending, likesController.getLikes,
          postController.getYourPosts, viewsController.showUser);

profileRouter.route('/delete')
    .get(viewsController.showDelete)
    .delete(authController.authenticate, profileController.delete, viewsController.showHome);

profileRouter.route('/edit/:id')
  .get(authController.isUser, authController.getUserId, viewsController.showEdit)
  .post(authController.checkUser, profileController.updateUser, profileController.getAllUsers,
            likesController.getLikes, postController.getYourPosts, viewsController.showUser);

profileRouter.route('/logout')
  .get(authController.logout);

module.exports = profileRouter;
