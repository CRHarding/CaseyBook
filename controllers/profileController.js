const users = require('../models/profileDB');

module.exports = {
  landingPage(req, res, next) {
    users.find(req.params.username)
    .then(result => {
      res.locals.user = user;
      req.session.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  getAllUsers(req, res, next) {
    users.getUsers(req.session.user)
    .then(users => {
      req.session.users = users;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  updateUser(req, res, next) {
    req.session.oldUser.id = req.session.user.id;
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
    console.log(res.locals.generalLoc);
    if (!res.locals.generalLoc) {
      res.locals.generalLoc = 0;
    }

    const saveUser = { 'body': req.body, 'loc': res.locals.generalLoc }
    console.log(saveUser);
    users.save(saveUser)
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      console.log(user);
      next();
    })
    .catch(err => {
      console.log('DID NOT WORK', err);
      next(err);
    });
  },

  findFriendByUsername(req, res, next) {
    username = req.params.id;
    users.findFriendByUsername(username)
    .then(foundFriend => {
      res.locals.friendUser = foundFriend;
      next();
    })
    .catch(err => {
      next(err);
    });
  },
};