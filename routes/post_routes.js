const express = require('express');
const postRouter = express.Router();
const profileController = require('../controllers/profileController');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');

postRouter.use(authController.isLoggedIn);

postRouter.route('/')
  .post(postController.addPost, postController.getYourPosts, viewsController.showUser);

module.exports = postRouter;
