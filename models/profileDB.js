const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  save(user) {
    return profileDB.one(`INSERT INTO users(name, password)
    VALUES($[name], $[password]) RETURNING id`, user);
  },

  update(user) {
    return profileDB.one(`UPDATE users SET name=$[name], password=$[password]
    WHERE id=$[id] RETURNING name, password`, user);
  },

  destroyByUsername(username) {
    return profileDB.none(`DELETE FROM users WHERE username = $1`, username);
  },

  findByUsername(username) {
    console.log(username);
    return profileDB.one(`SELECT * FROM users WHERE username = $1`, username);
  },

  create(user) {
    profileDB.one(
      `
      INSERT INTO users (username, fname, lname, password)
      VALUES ($[username], $[fname], $[lname], $[password]) RETURNING *
      `, user
    );
  },
};
