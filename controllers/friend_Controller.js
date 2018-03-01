const users = require('../models/profileDB');

module.exports = {
    areFriends(req, res, next) {
      console.log('inside arefriends, user_id, friend_id---->', req.session.user.fname, req.params.id);
      const areFriends = {'user_id': req.session.user.username, 'friend_id': req.params.id };
      console.log('inside are friends ---->', areFriends);
      users.areFriends(areFriends)
      .then(friend => {
        res.locals.friends = true;
        res.locals.areFriends = true;
        console.log(`THEY'RE FRIENDS`);
        next();
      })
      .catch(err => {
        res.locals.friends = false;
        res.locals.areFriends = false;
        console.log(`THEY AREN'T FRIENDS`, err);
        next();
      });
    },

    arePending(req, res, next) {
      if (!req.session.alreadyFriends) {
        const pendingFriends = {'user_id': req.session.user.username, 'friend_id': req.params.id };
        console.log('inside pending ---->', pendingFriends);
        users.arePending(pendingFriends)
        .then(friend => {
          res.locals.pending = true;
          req.session.pendingFriends = friend;
          console.log(`THEY'RE PENDING`);
          next();
        })
        .catch(err => {
          res.locals.pending = false;
          console.log(`THEY AREN'T PENDING`);
          next();
        });
      };
    },

    addFriend(req, res, next) {
      console.log('WORKING IN ADDFRIEND');
      if (!req.session.alreadyFriends) {
        const updateFriendRequest = { 'user_id': req.session.user.username, 'friend_id': req.params.id, 'status': 3 };
        console.log('inside addFriend');
        users.addPending(updateFriendRequest)
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
        console.log('PENDING FRIENDS ------->', friends);
        next();
      })
      .catch(err => {
        console.log('NO PENDING FRIENDS --------->', err);
        next();
      });
    },

    findPending(req, res, next) {
      console.log('inside findpending ---->', req.session.user.username);
      users.findPending(req.session.user.username)
      .then(friends => {
        req.session.findPending = true;
        req.session.findPendingFriends = friends;
        console.log(`PENDING FRIENDS ------>`, friends);
        next();
      })
      .catch(err => {
        res.locals.findPending = false;
        console.log(`THEY AREN'T PENDING`, err);
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
      const confirmFriend = { 'user_id': req.session.user.username, 'friend_id': req.params.id };
      console.log('inside infriends---->', confirmFriend);
      users.inFriendDatabase(confirmFriend)
      .then(friends => {
        console.log('WORKING IN INFRIENDS');
        req.session.alreadyFriends = true;
        next();
      })
      .catch(err => {
        console.log('NOT WORKING IN INFRIENDS');
        req.session.alreadyFriends = false;
        next();
      });
    },
  };
