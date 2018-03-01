const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  save(user) {
    return profileDB.one(`INSERT INTO users(fname, lname, username, password, aboutme)
                                        VALUES($[fname], $[lname], $[username],
                                          $[password], $[aboutme]) RETURNING *`, user);
  },

  getUsers(user) {
    return profileDB.any(`SELECT *
                                            FROM users
                                            WHERE username != $[username]`, user);
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

  findFriendByUsername(friend) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, friend);
  },

  findUser(user) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]`, user);
  },

  areFriends(friends) {
    console.log('inside db are friends', friends.user_id, friends.friend_id);
    return profileDB.one(`SELECT user_id, friend_id
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
    return profileDB.one(`SELECT user_id, friend_id
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
    return profileDB.one(`INSERT INTO friends (user_id, friend_id, status)
                                        VALUES ($[user_id], $[friend_id], $[status])
                                        RETURNING user_id`, friend);
  },

  addFriend(friend) {
    return profileDB.one(`UPDATE friends
                                          SET  status = $[status]
                                          WHERE user_id = $[user_id]
                                          AND friend_id = $[friend_id]`, friend);
  },

  create(user) {
    return profileDB.one(`INSERT INTO users (username, password)
                                        VALUES ($[username], $[password]) RETURNING *`, user);
  },

  findPending(user) {
    console.log('inside db findpending', user);
    return profileDB.any(`SELECT user_id, friend_id
                                        FROM friends
                                        WHERE friend_id = $1 AND
                                        status = 3`, user);
  },

  getPendingFriends(user) {
    console.log('inside getpendingfriends with user----->', user);
    return profileDB.any(`SELECT user_id, friend_id
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
    return profileDB.one(`SELECT user_id, friend_id
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
    return profileDB.any(`SELECT friend_id
                                        FROM friends
                                        WHERE user_id = $[username]
                                        AND status = 4`, user);
  },
};
