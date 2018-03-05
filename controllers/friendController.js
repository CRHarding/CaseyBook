const users = require('../models/friendDB');

module.exports = {
    areFriends(req, res, next) {
      const areFriends = {'user_id': req.session.user.username, 'friend_id': res.locals.friendUser.username };
      users.areFriends(areFriends)
      .then(friend => {
        res.locals.friends = true;
        res.locals.areFriends = true;
        next();
      })
      .catch(err => {
        res.locals.friends = false;
        res.locals.areFriends = false;
        next();
      });
    },

    arePending(req, res, next) {
      if (!req.session.alreadyFriends) {
        const pendingFriends = {'user_id': req.session.user.username, 'friend_id': res.locals.friendUser.username };
        users.arePending(pendingFriends)
        .then(friend => {
          res.locals.pending = true;
          req.session.pendingFriends = friend;
          next();
        })
        .catch(err => {
          res.locals.pending = false;
          next();
        });
      } else {
        next();
      }
    },

    addFriend(req, res, next) {
      if (!req.session.alreadyFriends) {
        const updateFriendRequest = { 'user_id': req.session.user.username, 'friend_id': req.params.id, 'status': 3 };
        users.addPending(updateFriendRequest)
        .then(friend => {
          req.session.pending = `Sending friend request to ${req.session.user.username}`;
          res.locals.pending = true;
          res.locals.friends = false;
          next();
        })
        .catch(err => {
          req.session.error = `You can't add this friend...sorry`;
          res.locals.pending = false;
          res.locals.friends = false;
          next();
        });
      } else {
        next();
      };
    },

    confirmFriend(req, res, next) {
      const confirmFriend = { 'user_id': req.params.id, 'friend_id': req.session.user.username, 'status': 1 };
      users.addFriend(confirmFriend)
      .then(friend => {
        req.session.success = `Friend added!`;
        res.locals.pending = false;
        res.locals.friends = true;
        res.redirect('back');
      })
      .catch(err => {
        req.session.error = `You can't confirm this friend...sorry`;
        res.locals.friends = false;
        res.locals.pending = false;
        next();
      });
    },

    getPendingFriends(req, res, next) {
      users.getPendingFriends(req.session.user.username)
      .then(friends => {
        req.session.pendingFriends = friends;
        next();
      })
      .catch(err => {
        next();
      });
    },

    findPending(req, res, next) {
      users.findPending(req.session.user.username)
      .then(friends => {
        req.session.findPending = true;
        req.session.findPendingFriends = friends;
        next();
      })
      .catch(err => {
        res.locals.findPending = false;
        next();
      });
    },

    getNonFriends(req, res, next) {
      users.getNonFriends(req.session.user)
      .then(nonFriends => {
        req.session.nonFriends = nonFriends;
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
      const confirmFriend = { 'user_id': req.session.user.username, 'friend_id': req.params.id };
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
