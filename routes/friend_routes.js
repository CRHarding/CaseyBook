const express = require('express');
const friendRouter = express.Router();
const profileController = require('../controllers/profileController');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');
const likesController = require('../controllers/likeController');

friendRouter.use(authController.isLoggedIn);

friendRouter.route('/:id')
  .get(profileController.findFriendByUsername, friendController.arePending,
          friendController.areFriends, postController.getAllFriendPosts,
              postController.getPublicFriendPosts, likesController.getLikes,
                viewsController.showFriendPage);

friendRouter.route('/addFriend/:id')
  .get(profileController.findFriendByUsername, friendController.inFriends,
          friendController.arePending, friendController.addFriend, postController.getAllFriendPosts,
              postController.getPublicFriendPosts, likesController.getLikes,
                viewsController.showFriendPage);

friendRouter.route('/confirmFriend/:id')
  .get(profileController.findFriendByUsername, friendController.inFriends,
          friendController.confirmFriend, friendController.areFriends,
          postController.getAllFriendPosts, postController.getPublicFriendPosts,
              likesController.getLikes, viewsController.showFriendPage);

friendRouter.route('/addLike/:id')
  .post(likesController.alreadyLikes, likesController.updateLike,
            likesController.getLikes, viewsController.showBack);

friendRouter.route('/removeLike/:id')
  .post(likesController.removeLike, likesController.getLikes, viewsController.showBack);

module.exports = friendRouter;
