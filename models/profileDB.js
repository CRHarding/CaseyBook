const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  save(user) {
    return profileDB.one(`INSERT INTO users(fname, lname, username, password, aboutme)
                                        VALUES($[fname], $[lname], $[username],
                                          $[password], $[aboutme]) RETURNING *`, user);
  },

  getUsers() {
    return profileDB.many(`SELECT *
                                            FROM users`);
  },

  update(user) {
    return profileDB.one(`UPDATE users SET fname = $[fname], lname = $[lname],
                                          username=$[username], password=$[password],
                                          aboutme = $[aboutme]
                                        WHERE id=$[id] RETURNING *`, user);
  },

  destroyByUsername(user) {
    return profileDB.none(`DELETE FROM users WHERE username = $1`, user.username);
  },

  authenticateByUsername(user) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
  },

  findByUsername(user) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, user.username);
  },

  findFriendByUsername(user) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, user);
  },

  areFriends(friends) {
    console.log('inside db are friends', friends.user_id, friends.friend_id);
    return profileDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = friends.user_id AND
                                        friend_id = friends.friend_id AND
                                        status = 1`, friends);
  },

  arePending(friends) {
    console.log('inside db pending', friends.user_id, friends.friend_id);
    return profileDB.one(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE user_id = friends.user_id AND
                                        friend_id = friends.friend_id AND
                                        status = 3
                                        `, friends);
  },

  addFriend(friend) {
    return profileDB.one(`INSERT INTO friends (user_id, friend_id, status)
                                        VALUES ($[user_id], $[friend_id], $[status])
                                        RETURNING user_id`, friend);
  },

  create(user) {
    return profileDB.one(`INSERT INTO users (username, password)
                                        VALUES ($[username], $[password]) RETURNING *`, user);
  },

  getPendingFriends(user) {
    return profileDB.any(`SELECT friend_id
                                        FROM friends
                                        WHERE user_id = $[username]
                                        AND status = 3`, user);
  },

  getNonFriends(user) {
    return profileDB.any(`SELECT friend_id
                                        FROM friends
                                        WHERE user_id = $[username]
                                        AND status = 4`, user);
  },
};
