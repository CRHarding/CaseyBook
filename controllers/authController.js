const users = require('../models/profileDB');
const hasher = require('pbkdf2-password')();

module.exports = {
//Checking to make sure the user editing their profile doesn't change their username
//to one that is already in the database

  checkUser(req, res, next) {
    req.session.oldUser = req.body;
    if (req.body.username != req.session.user.username) {
      users.findFriendByUsername(req.body)
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

//Check a new user to make sure the username they choose isn't already in the database
  checkNewUser(req, res, next) {
    req.session.oldUser = req.body;
    users.findFriendByUsername(req.body)
    .then(user => {
      req.session.error = 'That username already exists!';
      res.redirect('back');
    })
    .catch(err => {
      next();
    });
  },

//Retrieve the userid from the database
  getUserId(req, res, next) {
    users.findUser(req.session.user)
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

//check to see if the user saved in the req.session is the user of the page we are on,
//to check for editing purposes
  isUser(req, res, next) {
    if (req.session.user.username === req.params.id) {
      next();
    } else {
      req.session.error = 'Only the user can edit it.';
      res.redirect(`back`);
    };
  },

//authenticate the username / password combination
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

//update the current location of the user in the database.
  updateLoc(req, res, next) {
    if (req.session.user) {
      const locUser = { 'name': req.session.user.username, 'loc': req.body.region };
      if (req.session.user) {
        users.updateLoc(locUser)
        .then(user => {
          next();
        })
        .catch(err => {
          next();
        });
      };
    }else {
      next();
    }
  },
};
