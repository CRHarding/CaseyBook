const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const friendController = require('../controllers/friend_Controller');

profileRouter.use(authController.isLoggedIn);

profileRouter.route('/')
  .get(profileController.getAllUsers, viewsController.showHome);

profileRouter.route('/myProfile')
  .get(friendController.getPendingFriends, friendController.getNonFriends, friendController.findPending, viewsController.showUser);

profileRouter.route('/delete')
    .get(viewsController.showDelete)
    .delete(authController.authenticate, profileController.delete, viewsController.showHome);

profileRouter.route('/edit/:id')
  .get(authController.isUser, authController.getUserId, viewsController.showEdit)
  .post(authController.checkUser, profileController.updateUser, profileController.getAllUsers, viewsController.showUser);

profileRouter.route('/logout')
  .get(authController.logout);

profileRouter.route('/:id')
  .get(profileController.findFriendByUsername, viewsController.showUser);

module.exports = profileRouter;

// friendController.alreadyFriends,
