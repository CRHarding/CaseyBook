const likes = require('../models/likeDB');

module.exports = {
  updateLike(req, res, next) {
    console.log('inside findpopstbyid: --->', req.params.id, req.session.user);
    const updatePost = { 'user': req.session.user, 'post': req.params.id };
    likes.updateLike(updatePost)
    .then(post => {
      console.log('POST UPDATED------>', post);
      next();
    })
    .catch(err => {
      console.log('POST NOT UPDATED', err);
      next(err);
    });
  },
};
