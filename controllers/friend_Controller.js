const users = require('../models/profileDB');

module.exports = {
    // alreadyFriends(req, res, next) {
    //   users.areFriends(req.params.id, req.session.user)
    //   .then(friend => {
    //     res.error = ''
    //   })
    //   .catch(err => {
    //     next();
    //   });
    // },

    addFriend(req, res, next) {
      console.log('inside add friend -->', req.params.id, req.session.user.username);
      users.addFriend(req.params.id, req.session.user.username, 1)
      .then(friend => {
        req.session.success = `You're not friends!`;
        next();
      })
      .catch(err => {
        req.session.error = `You couldn't add a friend...sorry`;
        next(err);
      });
    },
  };
