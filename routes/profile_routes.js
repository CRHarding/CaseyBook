const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile_controller');
const viewsController = require('../controllers/viewsController');

profileRouter.post('/', profileController.createUser, viewsController.showUser);
profileRouter.get('/:id', profileController.landingPage, viewsController.showUser);
profileRouter.put('/:id', profileController.updateUser, viewsController.showUser);
profileRouter.delete('/:id', profileController.delete);

module.exports = profileRouter;
