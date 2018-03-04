const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  save(user, ip) {
    console.log(ip);
    return profileDB.one(`INSERT INTO users(fname, lname, username, password, aboutme, ip)
                                        VALUES($[fname], $[lname], $[username],
                                          $[password], $[aboutme], $[ip]) RETURNING *`, user, ip);
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

  findUser(user) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]`, user);
  },

  findFriendByUsername(friend) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $1`, friend);
  },

  updateLoc(user) {
    console.log('INSIDE UPDATE LOC----->', user);
    return profileDB.one(`UPDATE users SET loc = $[loc]
                                        WHERE username = $[name] RETURNING *`, user);
  },
};
