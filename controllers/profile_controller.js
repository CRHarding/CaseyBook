const users = require('../models/profileDB');

module.exports = {
  landingPage(req, res, next) {
    users.find(req.params.username)
    .then(result => {
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  getAllUsers(req, res, next) {
    users.getUsers()
    .then(users => {
      console.log('inside getallusers ---->', users);
      req.session.users = users;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  createUser(req, res, next) {
    users.save(req.params.username, req.params.pass)
    .then(result => {
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  updateUser(req, res, next) {
    req.session.oldUser.id = req.session.user.id;
    console.log('inside update user oldUser, user-->', req.session.oldUser, req.session.user);
    users.update(req.session.oldUser)
    .then(newUser => {
      res.locals.user = newUser;
      req.session.user = newUser;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  delete(req, res, next) {
    users.destroyByUsername(req.body)
    .then((user) => {
      req.session.destroy(() => {
        res.redirect('/');
      });
    })
    .catch(err => {
      next(err);
    });
  },

  save(req, res, next) {
    users.save(req.body)
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      console.log(user);
      next();
    })
    .catch(err => {
      console.log('DID NOT WORK');
      next(err);
    });
  },

  findByUsername(req, res, next) {
    username = req.params.id;
    users.findByUsername(username)
    .then(foundUser => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  findFriendByUsername(req, res, next) {
    console.log('inside findfriendbyusername: --->', req.params.id);
    username = req.params.id;
    users.findFriendByUsername(username)
    .then(foundFriend => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },
};
