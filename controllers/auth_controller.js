const users = require('../models/profileDB');
const hasher = require('pbkdf2-password')();

module.exports = {
  checkUser(req, res, next) {
    if (users.findByUsername(req.params.user)) {
      req.session.error = 'That username already exists!';
      res.redirect('/authenticate/register');
    } else {
      next();
    }
  },

  save(req, res, next) {
    users.save(req.user);
    req.session.user = user;
    next();
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
    if (req.session.user.id === res.locals.quote.author_id) {
      next();
    } else {
      req.session.error = 'Only the user can edit it.';
      res.redirect(`back`);
    };
  },

  authenticate(req, res, next) {
    console.log(req.body.username);
    users.findByUsername(req.body.username)
      .then((user) => {
        console.log('user found!');
      })
      .catch(err => console.log('user not found!'));
  },
};
