const express = require('express');
const postRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');
const friendController = require('../controllers/friend_Controller');
const postController = require('../controllers/post_Controller');

postRouter.use(authController.isLoggedIn);

postRouter.route('/')
  .post(postController.addPost, postController.getYourPosts, viewsController.showUser);

module.exports = postRouter;
