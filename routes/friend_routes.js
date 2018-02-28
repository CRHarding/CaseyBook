const express = require('express');
const friendRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const friendController = require('../controllers/friend_Controller');

friendRouter.route('/:id')
  .get(profileController.findFriendByUsername, friendController.arePending, friendController.areFriends, viewsController.showFriendPage);

friendRouter.route('/addFriend/:id')
  .get(friendController.inFriends, friendController.arePending, friendController.addFriend, viewsController.showFriendPage);

friendRouter.route('/confirmFriend/:id')
  .get(friendController.inFriends, friendController.areFriends, friendController.confirmFriend, viewsController.showFriendPage);

module.exports = friendRouter;
