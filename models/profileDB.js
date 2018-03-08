const profileDB = require('../config/connection');
const hasher = require('bcrypt');

module.exports = {
  save(sentUser) {
    let salt = hasher.genSaltSync(10);
    let hash = hasher.hashSync(sentUser.body.password, salt);
    const user = { 'fname': sentUser.body.fname, 'lname': sentUser.body.lname,'username': sentUser.body.username, 'aboutme': sentUser.body.aboutme, 'loc': sentUser.loc, 'password': hash, 'salt': salt };
    return profileDB.one(`INSERT INTO users(fname, lname, username, salt, password, aboutme, loc)
                                        VALUES($[fname], $[lname], $[username],
                                          $[salt], $[password], $[aboutme], $[loc]) RETURNING *`, user);
  },

  checkUser(sentUser) {
    if (hasher.compareSync(sentUser.password, sentUser.hash)) {
      const user = { 'username': sentUser.username, 'password': sentUser.hash };
      return profileDB.one(`SELECT *
                                          FROM users
                                          WHERE username = $[username]
                                          AND password = $[password]`,
                                          user);
    }
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
    return profileDB.one(`UPDATE users SET loc = $[loc]
                                        WHERE username = $[name] RETURNING *`, user);
  },

};
