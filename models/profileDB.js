const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  find(id) {
    return profileDB.one(`SELECT * FROM users WHERE id = $1`, id);
  },

  save(user) {
    return profileDB.one(`INSERT INTO users(name, password)
    VALUES($[name], $[password]) RETURNING id`, user);
  },

  update(user) {
    return profileDB.one(`UPDATE users SET name=$[name], password=$[password]
    WHERE id=$[id] RETURNING name, password`, user);
  },

  destroyByUsername(uname) {
    return profileDB.none(`DELETE FROM users WHERE uname = $1`, uname);
  },

  findByUsername(uname) {
    return profileDB.one(`SELECT * FROM users WHERE uname = $1`, uname);
  },

  create({ username, password }) {
    const hashPromise = new Promise((resolve, reject) => {
      hasher({ password }, ((err, pass, salt, hash) => {
        if (err) return reject(err);
        return resolve({
          username,
          hash,
          salt,
        });
      }));
    });
    return hashPromise.then(user => db.one(
      `
      INSERT INTO users (username, hash, salt)
      VALUES ($[username], $[hash], $[salt]) RETURNING *
      `,
        user,
    ),
  );
  },
};
