const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  save(user) {
    console.log('inside save user', user.username, user.password);
    return profileDB.one(`INSERT INTO users(username, password)
    VALUES($[username], $[password]) RETURNING username, password`, user);
  },

  getUsers() {
    return profileDB.many(`
      SELECT *
      FROM users`);
  },

  update(user) {
    console.log('inside update user --->', user);
    return profileDB.one(`UPDATE users SET username=$[username], password=$[password]
    WHERE id=$[id] RETURNING username, password`, user);
  },

  destroyByUsername(user) {
    console.log('deleting user: ', user.username);
    return profileDB.none(`DELETE FROM users WHERE username = $1`, user.username);
  },

  authenticateByUsername(user) {
    console.log('inside authenticate by username', user);
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
  },

  findByUsername(user) {
    console.log('inside find by username', user.username);
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, user.username);
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
