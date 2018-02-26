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
    users.update(req.params.username, req.params.pass)
    .then(result => {
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  delete(req, res, next) {
    console.log('deleting: ', req.body);
    users.destroyByUsername(req.body)
    .then((user) => {
      req.session.destroy(() => {
        res.redirect('/');
      });
    })
    .catch(err => {
      console.log('user not found');
      next(err);
    });
  },

  save(req, res, next) {
    console.log('inside save user', req.body);
    users.save(req.body)
    .then(user => {
      req.session.user = user;
      console.log(user);
      next();
    })
    .catch(err => {
      console.log('user save failed', err);
    });
  },

  findByUsername(req, res, next) {
    console.log(`inside controller findbyusername -->`, req.params.id);
    username = req.params.id;
    users.findByUsername(username)
    .then(foundUser => {
      console.log(`User found -->`, foundUser);
      next();
    })
    .catch(err => {
      next(err);
    });
  },
};
