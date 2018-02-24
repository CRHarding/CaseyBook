const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth_controller');
const viewsController = require('../controllers/viewsController');

authRouter.get('/login', (req, res) => {
  res.render('login');
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});
