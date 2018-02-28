const users = require('../models/profileDB');

module.exports = {
    areFriends(req, res, next) {
      const areFriends = {'user_id': req.params.id, 'friend_id': req.session.user.username };
      console.log('inside are friends ---->', areFriends);
      users.areFriends(areFriends)
      .then(friend => {
        res.locals.friends = true;
        res.locals.pending = false;
        console.log(`THEY'RE FRIENDS`);
        next();
      })
      .catch(err => {
        res.locals.friends = false;
        res.locals.pending = false;
        console.log(`THEY AREN'T FRIENDS`);
        next();
      });
    },

    arePending(req, res, next) {
      const pendingFriends = {'user_id': req.params.id, 'friend_id': req.session.user.username };
      console.log('inside pending ---->', pendingFriends);
      users.arePending(pendingFriends)
      .then(friend => {
        res.locals.friends = false;
        res.locals.pending = true;
        console.log(`THEY'RE PENDING`);
        next();
      })
      .catch(err => {
        res.locals.friends = false;
        res.locals.pending = false;
        console.log(`THEY AREN'T PENDING`);
        next();
      });
    },

    addFriend(req, res, next) {
      const updateFriends = { 'user_id': req.params.id, 'friend_id': req.session.user.username, 'status': 3 };
      console.log('inside addFriend');
      users.addFriend(updateFriends)
      .then(friend => {
        console.log('setting friend status to 3');
        req.session.pending = `Sending friend request to ${req.session.user.username}`;
        res.locals.pending = true;
        res.locals.friends = false;
        next();
      })
      .catch(err => {
        console.log('error in addfriend.....', err);
        req.session.error = `You can't add this friend...sorry`;
        res.locals.pending = false;
        res.locals.friends = false;
        next();
      });
    },

    confirmFriend(req, res, next) {
      const confirmFriend = { 'user_id': req.params.id, 'friend_id': req.session.user.username, 'status': 1 };
      users.addFriend(confirmFriend)
      .then(friend => {
        req.session.success = `Friend added!`;
        res.locals.pending = false;
        res.locals.friends = true;
        next();
      })
      .catch(err => {
        req.session.error = `You can't confirm this friend...sorry`;
        res.locals.friends = false;
        res.locals.pending = false;
        next();
      });
    },

    getPendingFriends(req, res, next) {
      users.getPendingFriends(req.session.user)
      .then(friends => {
        req.session.pendingFriends = friends;
        console.log('PENDING FRIENDS ------->', friends);
        next();
      })
      .catch(err => {
        next();
      });
    },

    getNonFriends(req, res, next) {
      users.getNonFriends(req.session.user)
      .then(nonFriends => {
        req.session.nonFriends = nonFriends;
        console.log('NON FRIENDS -------->', nonFriends);
        if (nonFriends.length === 0) {
          req.session.nonFriends = 'none';
        }

        next();
      })
      .catch(err => {
        next();
      });
    },

    inFriends(req, res, next) {
      const confirmFriend = { 'user_id': req.params.id, 'friend_id': req.session.user.username};
      users.inFriendDatabase(confirmFriend)
      .then(friends => {
        req.session.alreadyFriends = true;
        next();
      })
      .catch(err => {
        req.session.alreadyFriends = false;
        next();
      });
    },
  };
