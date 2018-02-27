const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  save(user) {
    return profileDB.one(`INSERT INTO users(username, password)
    VALUES($[username], $[password]) RETURNING username, password`, user);
  },

  getUsers() {
    return profileDB.many(`
      SELECT *
      FROM users`);
  },

  update(user) {
    return profileDB.one(`UPDATE users SET username=$[username], password=$[password]
    WHERE id=$[id] RETURNING username, password`, user);
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

  areFriends(userOne, userTwo) {
    return profileDB.one(`SELECT DISTINCT userOne, userTwo
                                        FROM friends
                                        WHERE status = 1
                                        UNION
                                        SELECT DISTINCT userTwo, userOne
                                        FROM friends
                                        WHERE status = 1`);
  },

  addFriend(user_id, friend_id, status) {
    console.log(user_id, friend_id, status);
    return profileDB.one(`INSERT INTO friends (user_id, friend_id, status)
                                        VALUES ($[user_id], $[friend_id], $[status])
                                        RETURNING user_id`, user_id, friend_id, status);
  },

  create(user) {
    return profileDB.one(
      `
      INSERT INTO users (username, password)
      VALUES ($[username], $[password]) RETURNING *
      `, user
    );
  },
};
