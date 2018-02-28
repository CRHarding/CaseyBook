const users = require('../models/profileDB');
const hasher = require('pbkdf2-password')();

module.exports = {
  checkUser(req, res, next) {
    req.session.oldUser = req.body;
    if (req.body.username != req.session.user.username) {
      users.findByUsername(req.body)
      .then(user => {
        req.session.error = 'That username already exists!';
        res.redirect('back');
      })
      .catch(err => {
        next();
      });
    } else {
      next();
    }
  },

  checkNewUser(req, res, next) {
    req.session.oldUser = req.body;
    users.findByUsername(req.body)
    .then(user => {
      req.session.error = 'That username already exists!';
      res.redirect('back');
    })
    .catch(err => {
      next();
    });
  },

  getUserId(req, res, next) {
    users.findByUsername(req.session.user)
    .then(user => {
      req.session.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/index');
    });
  },

  isLoggedIn(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Login required';
      res.redirect('back');
    }
  },

  isUser(req, res, next) {
    if (req.session.user.username === req.params.id) {
      next();
    } else {
      req.session.error = 'Only the user can edit it.';
      res.redirect(`back`);
    };
  },

  authenticate(req, res, next) {
    users.authenticateByUsername(req.body)
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.success = 'Authenticated as ' + user.username;
      next();
    })
    .catch(err => {
      req.session.error = 'Authentication failed. Please try again';
      res.redirect(`back`);
    });
  },
};
