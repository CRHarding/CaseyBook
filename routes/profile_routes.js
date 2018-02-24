const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile_Controller');
const viewsController = require('../controllers/views_Controller');
const authController = require('../controllers/auth_Controller');

profileRouter.get('/', profileController.findByUsername);
profileRouter.post('/', authController.authenticate, profileController.createUser, viewsController.showUser);

profileRouter.get('/:id', profileController.landingPage, viewsController.showUser);
profileRouter.put('/:id', profileController.updateUser, viewsController.showUser);
profileRouter.delete('/:id', profileController.delete);

module.exports = profileRouter;
