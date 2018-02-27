const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const friendController = require('../controllers/friend_Controller');

profileRouter.use(authController.isLoggedIn);

profileRouter.route('/delete')
    .get(viewsController.showDelete)
    .delete(authController.authenticate, profileController.delete, viewsController.showHome);

profileRouter.route('/:id')
  .get(profileController.findByUsername, viewsController.showUser);

profileRouter.route('/edit/:id')
  .get(authController.isUser, authController.getUserId, viewsController.showEdit)
  .post(authController.checkUser, profileController.updateUser, profileController.getAllUsers, viewsController.showUser);

profileRouter.route('/friend/:id')
  .get(profileController.findFriendByUsername, viewsController.showFriendPage);

profileRouter.route('/addFriend/:id')
  .get(friendController.addFriend, viewsController.showFriendPage);

module.exports = profileRouter;

// friendController.alreadyFriends,
