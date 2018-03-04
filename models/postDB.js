const postDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  addPost(post) {
    return postDB.one(`INSERT INTO posts(user_id, content, rest)
                                    VALUES($[user_id], $[content], $[rest])
                                    RETURNING *`, post);
  },

  getYourPosts(user) {
    return postDB.any(`SELECT user_id, content, id
                                    FROM posts
                                    WHERE user_id = $1`, user);
  },

  getPublicFriendPosts(friend) {
    return postDB.any(`SELECT user_id, content, id
                                    FROM posts
                                    WHERE user_id = $1
                                    AND rest = 1`, friend);
  },

  getAllFriendPosts(friend) {
    return postDB.any(`SELECT user_id, content, id
                                    FROM posts
                                    WHERE user_id = $1
                                    AND rest = 1
                                    OR user_id = $1
                                    AND rest = 3`, friend);
  },
};
