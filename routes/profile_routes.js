const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profile_controller');
const viewsController = require('../controllers/viewsController');

profileRouter.get('/', profileController.findByUsername);
profileRouter.post('/', profileController.createUser, viewsController.showUser);
profileRouter.post('/authenticate', profileController.findByUsername);
profileRouter.get('/:id', profileController.landingPage, viewsController.showUser);
profileRouter.put('/:id', profileController.updateUser, viewsController.showUser);
profileRouter.delete('/:id', profileController.delete);

module.exports = profileRouter;
