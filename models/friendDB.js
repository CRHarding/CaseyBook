const friendDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  areFriends(friends) {
    console.log('inside db are friends', friends.user_id, friends.friend_id);
    return friendDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = $[user_id] AND
                                        friend_id = $[friend_id] AND
                                        status = 1
                                        OR
                                        user_id = $[friend_id] AND
                                        friend_id = $[user_id] AND
                                        status = 1`, friends);
  },

  arePending(friends) {
    console.log('inside db pending', friends.user_id, friends.friend_id);
    return friendDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = $[user_id] AND
                                        friend_id = $[friend_id] AND
                                        status = 3
                                        OR
                                        user_id = $[friend_id] AND
                                        friend_id = $[user_id] AND
                                        status = 3
                                        `, friends);
  },

  addPending(friend) {
    return friendDB.one(`INSERT INTO friends (user_id, friend_id, status)
                                        VALUES ($[user_id], $[friend_id], $[status])
                                        RETURNING user_id`, friend);
  },

  addFriend(friend) {
    return friendDB.one(`UPDATE friends
                                          SET  status = $[status]
                                          WHERE user_id = $[user_id]
                                          AND friend_id = $[friend_id]`, friend);
  },

  create(user) {
    return friendDB.one(`INSERT INTO users (username, password)
                                        VALUES ($[username], $[password]) RETURNING *`, user);
  },

  findPending(user) {
    console.log('inside db findpending', user);
    return friendDB.any(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE friend_id = $1 AND
                                        status = 3`, user);
  },

  getPendingFriends(user) {
    console.log('inside getpendingfriends with user----->', user);
    return friendDB.any(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE friend_id = $1 AND
                                        status = 3
                                        OR
                                        user_id = $1 AND
                                        status = 3
                                        `, user);
  },

  inFriendDatabase(friends) {
    console.log('in infrienddatabase ---->', friends);
    return friendDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = $[user_id] AND
                                        friend_id = $[friend_id]
                                        OR
                                        user_id = $[friend_id] AND
                                        friend_id = $[user_id]
                                        `,  friends);
  },

  getNonFriends(user) {
    console.log('inside getnonfriends with user ---->', user);
    return friendDB.any(`SELECT friend_id
                                        FROM friends
                                        WHERE user_id = $[username]
                                        AND status = 4`, user);
  },
};
