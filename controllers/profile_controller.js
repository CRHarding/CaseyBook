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
    .then(() => next())
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

  findByUsername(req, res) {
    console.log(`inside controller findbyusername -->`, req.body.username);
    username = req.body.username;
    users.findByUsername(username)
    .then(foundUser => {
      console.log(`User found -->`, foundUser);
      res.json({
        message: 'found user',
        user: foundUser,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'User not found',
        err: err,
      });
    });
  },
};
