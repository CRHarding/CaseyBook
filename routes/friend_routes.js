const express = require('express');
const friendRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const friendController = require('../controllers/friend_Controller');
const postController = require('../controllers/post_Controller');
const likeController = require('../controllers/like_Controller');

friendRouter.use(authController.isLoggedIn);

friendRouter.route('/:id')
  .get(profileController.findFriendByUsername, friendController.arePending, friendController.areFriends, postController.getAllFriendPosts, postController.getPublicFriendPosts, viewsController.showFriendPage);

friendRouter.route('/addFriend/:id')
  .get(profileController.findFriendByUsername, friendController.inFriends, friendController.arePending, friendController.addFriend, viewsController.showFriendPage);

friendRouter.route('/confirmFriend/:id')
  .get(profileController.findFriendByUsername, friendController.inFriends, friendController.confirmFriend, friendController.areFriends, postController.getAllFriendPosts, postController.getPublicFriendPosts, viewsController.showFriendPage);

friendRouter.route('/addLike/:id')
  .post(likeController.updateLike, viewsController.showBack);

module.exports = friendRouter;
