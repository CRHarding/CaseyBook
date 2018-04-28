const users = require('../models/profileDB');

module.exports = {
  //Checking to make sure the user editing their profile
  //doesn't change their email to one that is already
  //in the database
  checkUser(req, res, next) {
    req.session.oldUser = req.body;
    if (req.body.email != req.session.user.email) {
      users
        .findFriendByUsername(req.body)
        .then(user => {
          req.session.error = 'That email already exists!';
          res.redirect('back');
        })
        .catch(err => {
          next();
        });
    } else {
      next();
    }
  },

  //Check a new user to make sure the email they
  //choose isn't already in the database
  checkNewUser(req, res, next) {
    req.session.oldUser = req.body;
    users
      .findFriendByUsername(req.body)
      .then(user => {
        req.session.error = 'That email already exists!';
        res.redirect('back');
      })
      .catch(err => {
        next();
      });
  },

  //Retrieve the userid from the database
  getUserId(req, res, next) {
    users
      .findUser(req.session.user)
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

  //check to see if the user saved in the req.session is
  //the user of the page we are on, to check for editing purposes
  isUser(req, res, next) {
    if (req.session.user.email === req.params.id) {
      next();
    } else {
      req.session.error = 'Only the user can edit it.';
      res.redirect(`back`);
    }
  },

  authenticate(req, res, next) {
    const initPass = req.body.password;
    users
      .findUser(req.body)
      .then(user => {
        user.hash = user.password;
        user.password = initPass;
        users
          .checkUser(user)
          .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.success = 'Authenticated as ' + user.email;
            next();
          })
          .catch(err => {
            req.session.error = 'Authentication failed. Please try again';
            res.redirect(`back`);
          });
      })
      .catch(err => {
        req.session.error =
          'Email and/or password not found, please try again';
        res.redirect('back');
      });
  },

  //update the current location of the user in the database.
  updateLoc(req, res, next) {
    if (req.session.user) {
      const locUser = { name: req.session.user.email, loc: req.body.region };
      if (req.session.user) {
        users
          .updateLoc(locUser)
          .then(user => {
            next();
          })
          .catch(err => {
            next();
          });
      }
    } else {
      next();
    }
  },
};
