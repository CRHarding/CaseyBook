const postDB = require('../config/connection');
const hasher = require('pbkdf2-password')();

module.exports = {
  addPost(post) {
    return postDB.one(`INSERT INTO posts(user_id, friend_id, content, rest)
                                    VALUES($[user_id], $[friend_id], $[content], $[rest])
                                    RETURNING *`, post);
  },

  getYourPosts(user) {
    return postDB.any(`SELECT user_id, friend_id, content, id
                                    FROM posts
                                    WHERE friend_id = $1`, user);
  },

  getPublicFriendPosts(friend) {
    return postDB.any(`SELECT user_id, friend_id, content, id
                                    FROM posts
                                    WHERE friend_id = $1
                                    AND rest = 1`, friend);
  },

  getAllFriendPosts(friend) {
    return postDB.any(`SELECT user_id, friend_id, content, id
                                    FROM posts
                                    WHERE friend_id = $1
                                    AND rest = 1
                                    OR friend_id = $1
                                    AND rest = 3`, friend);
  },

  getPostById(post) {
    return postDB.one(`SELECT *
                                    FROM posts
                                    WHERE id = $1`, post);
  },

  editPost(post) {
    return postDB.one(`UPDATE posts SET content = $[content], rest = $[rest]
                                    WHERE id = $[id] RETURNING *`, post);
  },

  deletePost(post) {
    return postDB.none(`DELETE FROM posts WHERE id = $1`, post);
  },
};
