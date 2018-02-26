const express = require('express');
const authRouter = express.Router();
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');

authRouter.route('/register')
  .get(viewsController.showRegister)
  .post(authController.checkUser, authController.save, viewsController.showUser);

authRouter.route('/delete')
  .get(viewsController.showDelete)
  .delete(authController.authenticate, authController.delete, viewsController.showHome);

authRouter.route('/login')
  .post(authController.authenticate, viewsController.showUser);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
