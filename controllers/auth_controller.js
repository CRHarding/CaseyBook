const users = require('../models/profileDB');
const hasher = require('pbkdf2-password')();

module.exports = {
  checkUser(req, res, next) {
    console.log('inside checkuser', req.body);
    users.findByUsername(req.body)
    .then(user => {
      req.session.error = 'That username already exists!';
      console.log('That username already exists!');
      res.redirect('/authenticate/register');
    })
    .catch(err => {
      next();
    });
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  },

  isLoggedIn(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Login required';
      res.redirect('/authenticate/login');
    }
  },

  isUser(req, res, next) {
    if (req.session.user === res.locals.user) {
      next();
    } else {
      req.session.error = 'Only the user can edit it.';
      res.redirect(`back`);
    };
  },

  authenticate(req, res, next) {
    users.findByUsername(req.body)
    .then(user => {
      req.session.user = user;
      console.log('authentication worked for user: ', req.session.user);
      req.session.success = 'Authenticated as ' + user.username;
      next();
    })
    .catch(err => {
      console.log('authentication failed');
      req.session.error = 'Authentication failed. Please try again';
      res.redirect(`back`);
    });
  },
};
