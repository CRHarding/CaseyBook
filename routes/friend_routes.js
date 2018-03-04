const express = require('express');
const friendRouter = express.Router();
const profileController = require('../controllers/profileController');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');

friendRouter.use(authController.isLoggedIn);

friendRouter.route('/:id')
  .get(profileController.findFriendByUsername, friendController.arePending,
          friendController.areFriends, postController.getAllFriendPosts,
              postController.getPublicFriendPosts, likeController.getLikes,
                viewsController.showFriendPage);

friendRouter.route('/addFriend/:id')
  .get(profileController.findFriendByUsername, friendController.inFriends,
          friendController.arePending, friendController.addFriend, postController.getAllFriendPosts,
              postController.getPublicFriendPosts, likeController.getLikes,
                viewsController.showFriendPage);

friendRouter.route('/confirmFriend/:id')
  .get(profileController.findFriendByUsername, friendController.inFriends,
          friendController.confirmFriend, friendController.areFriends,
          postController.getAllFriendPosts, postController.getPublicFriendPosts,
              likeController.getLikes, viewsController.showFriendPage);

friendRouter.route('/addLike/:id')
  .post(likeController.alreadyLikes, likeController.updateLike,
            likeController.getLikes, viewsController.showBack);

friendRouter.route('/removeLike/:id')
  .post(likeController.removeLike, likeController.getLikes, viewsController.showBack);

module.exports = friendRouter;
