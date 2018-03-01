const postDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  addPost(post) {
    console.log('inside addpost ---->', post);
    return postDB.one(`INSERT INTO posts(user_id, content, rest)
                                    VALUES($[user_id], $[content], $[rest])
                                    RETURNING *`, post);
  },

  getYourPosts(user) {
    return postDB.any(`SELECT content
                                    FROM posts
                                    WHERE user_id = $1`, user);
  },

  getPrivateFriendPosts(friend) {
    return postDB.any(`SELECT content
                                    FROM posts
                                    WHERE user_id = $1
                                    AND rest = 3`, friend);
  },

  getPublicFriendPosts(friend) {
    return postDB.any(`SELECT content
                                    FROM posts
                                    WHERE user_id = $1
                                    AND rest = 1`)
  },
};
