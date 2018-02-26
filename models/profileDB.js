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
    return profileDB.one(`UPDATE users SET name=$[user.name], password=$[user.password]
    WHERE id=$[user.id] RETURNING name, password`, user);
  },

  destroyByUsername(user) {
    console.log('deleting user: ', user.username);
    return profileDB.none(`DELETE FROM users WHERE username = $1`, user.username);
  },

  findByUsername(user) {
    console.log('inside find by username', user);
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
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
