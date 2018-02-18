const users = require('../models/profileDB');

module.exports = {
  landingPage(req, res, next) {
    users.find(req.params.id)
    .then(result => {
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  createUser(req, res, next) {
    users.save(req.params.id, req.params.pass)
    .then(result => {
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  updateUser(req, res, next) {
    users.update(req.params.id, req.params.pass)
    .then(result => {
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  delete(req, res, next) {
    users.destroy(req.params.id)
    .then(() => {
      res.json({
        message: `Ok, user with id ${req.params.id} deleted`,
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'error',
        error: err,
      });
    });
  },
};
