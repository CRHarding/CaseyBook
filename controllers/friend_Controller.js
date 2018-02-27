const users = require('../models/profileDB');

module.exports = {
    areFriends(req, res, next) {
      const areFriends = {'user_id': req.params.id, 'friend_id': req.session.user.username };
      console.log('inside are friends ---->', areFriends);
      users.areFriends(areFriends)
      .then(friend => {
        res.locals.friends = true;
        console.log(`THEY'RE FRIENDS`);
        next();
      })
      .catch(err => {
        res.locals.friends = false;
        console.log(`THEY AREN'T FRIENDS`);
        next(err);
      });
    },

    addFriend(req, res, next) {
      const updateFriends = { 'user_id': req.params.id, 'friend_id': req.session.user.username, 'status': 1 };
      users.addFriend(updateFriends)
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
