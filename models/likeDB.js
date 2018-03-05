const likeDB = require('../config/connection');

module.exports = {
  updateLike(updatePost) {
    return likeDB.one(`INSERT INTO likes(post_writer, friend_id, post_id)
                                    VALUES($[writer], $[friend], $[post])
                                    RETURNING *`, updatePost);
  },

  removeLike(updatePost) {
    return likeDB.none(`DELETE FROM likes
                                    WHERE friend_id = $[friend]
                                    AND post_id = $[post]`, updatePost);
  },

  getLikes(user) {
    return likeDB.any(`SELECT content, posts.user_id, posts.id, COUNT(likes.post_id)
                                    FROM likes
                                    JOIN posts
                                    ON likes.post_id = posts.id
                                    WHERE posts.user_id = $1
                                    GROUP BY content, posts.user_id, posts.id;`, user);
  },

  alreadyLikes(user) {
    return likeDB.one(`SELECT *
                                    FROM likes
                                    WHERE friend_id = $[friend]
                                    AND post_id = $[post]`, user);
  },
};
