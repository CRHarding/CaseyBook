const profileDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  hash(user) {
    const pass = hasher({ password: user.body.password, salt: user.body.salt }, (err, pass, salt, hash) => {
      if (err) {
        return err;
      } else {

        const newUser = { 'fname': user.body.fname, 'lname': user.body.lname,'username': user.body.username, 'aboutme': user.body.aboutme, 'password': hash, 'salt': salt }
        console.log('NEW USER----->', newUser);
        return newUser;
      }
    });
  },

  save(sentUser) {
    return profileDB.one(`INSERT INTO users(fname, lname, username, salt, password, aboutme, loc)
                                        VALUES($[user.fname], $[user.lname], $[user.username],
                                          $[salt], $[password], $[user.aboutme], $[user.loc]) RETURNING *`, sentUser);
  },

  checkUser(user) {
    return profileDB.one(`SELECT *
                                        FROM users
                                        WHERE username = $[username]
                                        AND password = $[password]`,
                                        user);
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
    return profileDB.one(`UPDATE users SET loc = $[loc]
                                        WHERE username = $[name] RETURNING *`, user);
  },

};
