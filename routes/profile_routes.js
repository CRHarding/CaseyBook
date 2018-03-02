const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');

profileRouter.use(authController.isLoggedIn);

profileRouter.route('/')
  .get(profileController.getAllUsers, viewsController.showHome);

profileRouter.route('/myProfile')
  .get(friendController.getPendingFriends, friendController.getNonFriends, friendController.findPending, postController.getYourPosts, viewsController.showUser);

profileRouter.route('/delete')
    .get(viewsController.showDelete)
    .delete(authController.authenticate, profileController.delete, viewsController.showHome);

profileRouter.route('/edit/:id')
  .get(authController.isUser, authController.getUserId, viewsController.showEdit)
  .post(authController.checkUser, profileController.updateUser, profileController.getAllUsers, postController.getYourPosts, viewsController.showUser);

profileRouter.route('/logout')
  .get(authController.logout);

profileRouter.route('/:id')
  .get(profileController.findFriendByUsername, viewsController.showUser);

module.exports = profileRouter;
