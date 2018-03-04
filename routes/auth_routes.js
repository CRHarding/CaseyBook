const express = require('express');
const authRouter = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const friendController = require('../controllers/friendController');
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');
const locController = require('../controllers/locationController');

authRouter.route('/register')
  .get(viewsController.showRegister)
  .post(authController.checkNewUser, locController.getLoc, profileController.save,
            profileController.getAllUsers, friendController.getNonFriends,
              viewsController.showNewUser);

authRouter.route('/login')
  .post(authController.authenticate, locController.getLoc, profileController.getAllUsers,
            friendController.getNonFriends, friendController.getPendingFriends,
              friendController.findPending, postController.getYourPosts, likeController.getLikes,
                    viewsController.showUser);

authRouter.post('/loc', authController.updateLoc);
authRouter.get('/logout', authController.logout);

module.exports = authRouter;
