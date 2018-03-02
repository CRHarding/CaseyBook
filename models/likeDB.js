const likeDB = require('../config/connection');

module.exports = {
  updateLike(updatePost) {
    console.log('inside addlike---->', updatePost);
    return likeDB.one(`INSERT INTO likes(user_id, post_id)
                                    VALUES($[user], $[post])
                                    RETURNING *`, updatePost);
  },

  removeLike(updatePost) {
    console.log('inside removelike----->', updatePost);
    return likeDB.one(`DELETE FROM likes
                                    WHERE user_id = $[user_id]
                                    AND id = $[post_id]`, updatePost);
  },

  getLikes(post) {
    console.log('inside getlikes ---->', post);
    return likeDB.any(`SELECT user_id, post_id
                                    FROM likes
                                    WHERE post_id = $[post_id])
                                    RETURNING user_id`, post);
  },

};
