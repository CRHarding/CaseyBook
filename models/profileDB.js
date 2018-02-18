const profileDB = require('../db/users');

module.exports = {
  find(id) {
    return profileDB.one('SELECT * FROM users WHERE id = $1', id);
  },

  save(user) {
    return profileDB.one('INSERT INTO users(name, password)\
    VALUES($[name], $[password]) RETURNING id', user);
  },

  update(user) {
    return profileDB.one('UPDATE users SET name=$[name], password=$[password]\
    WHERE id=$[id] RETURNING name, password', user);
  },

  destroy(id) {
    return profileDB.none('DELETE FROM users WHERE id = $1', id);
  },
};
