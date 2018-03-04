const express = require('express');
const postRouter = express.Router();
const profileController = require('../controllers/profileController');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');

postRouter.use(authController.isLoggedIn);

postRouter.route('/')
  .post(postController.addPost, profileController.getAllUsers,
            friendController.getNonFriends, friendController.getPendingFriends,
              friendController.findPending, postController.getYourPosts, likeController.getLikes,
                viewsController.showUser);

postRouter.route('/edit/:id')
  .get(postController.getPostById, viewsController.showPostEdit)
  .post(postController.editPost, profileController.getAllUsers,
            friendController.getNonFriends, friendController.getPendingFriends,
              friendController.findPending, postController.getYourPosts, likeController.getLikes,
              viewsController.showUser);

postRouter.route('/delete/:id')
  .post(postController.deletePost, profileController.getAllUsers,
            friendController.getNonFriends, friendController.getPendingFriends,
              friendController.findPending, postController.getYourPosts, likeController.getLikes,
              viewsController.showUser);

module.exports = postRouter;
