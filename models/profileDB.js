const profileDB = require('../config/connection');
const hasher = require('bcrypt');

module.exports = {
  save(sentUser) {
    let salt = hasher.genSaltSync(10);
    let hash = hasher.hashSync(sentUser.body.password, salt);
    const user = {
      fname: sentUser.body.fname,
      lname: sentUser.body.lname,
      email: sentUser.body.email,
      aboutme: sentUser.body.aboutme,
      loc: sentUser.loc,
      password: hash,
      salt: salt,
    };
    return profileDB.one(
      `INSERT INTO users(fname, lname, email, salt, password, aboutme, loc)
                                        VALUES($[fname], $[lname], $[email],
                                          $[salt], $[password], $[aboutme], $[loc]) RETURNING *`,
      user,
    );
  },

  isValidPassword(sentUser, password) {
    const hashPass = hasher.hashSync(sentUser.password, sentUser.salt);
    return bcrypt.compareSync(sentUser.password, hashPass);
  },

  checkUser(sentUser) {
    if (hasher.compareSync(sentUser.password, sentUser.hash)) {
      const user = { email: sentUser.email, password: sentUser.hash };
      return profileDB.one(
        `SELECT *
                                          FROM users
                                          WHERE email = $[email]
                                          AND password = $[password]`,
        user,
      );
    }
  },

  getUsers(user) {
    return profileDB.any(
      `SELECT *
                                            FROM users
                                            WHERE email != $[email]`,
      user,
    );
  },

  update(user) {
    return profileDB.one(
      `UPDATE users SET fname = $[fname], lname = $[lname],
                                          email=$[email], password=$[password],
                                          aboutme = $[aboutme]
                                        WHERE id=$[id] RETURNING *`,
      user,
    );
  },

  destroyByUsername(user) {
    return profileDB.none(
      `DELETE FROM users WHERE email = $1`,
      user.email,
    );
  },

  findUser(user) {
    return profileDB.one(
      `SELECT *
                                        FROM users
                                        WHERE email = $[email]`,
      user,
    );
  },

  findFriendByUsername(friend) {
    return profileDB.one(
      `SELECT *
                                        FROM users
                                        WHERE email = $1`,
      friend,
    );
  },

  updateLoc(user) {
    return profileDB.one(
      `UPDATE users SET loc = $[loc]
                                        WHERE email = $[name] RETURNING *`,
      user,
    );
  },
};
