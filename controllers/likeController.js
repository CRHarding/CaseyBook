const likes = require('../models/likeDB');

module.exports = {
  updateLike(req, res, next) {
    console.log('inside findpostbyid: --->', req.params.id, req.session.user.username);
    const like = { 'user': req.session.user.username, 'post': parseInt(req.params.id) };
    likes.updateLike(like)
    .then(workLike => {
      console.log('LIKE UPDATED------>', workLike);
      next();
    })
    .catch(err => {
      console.log('LIKE NOT UPDATED', err);
      next(err);
    });
  },

  removeLike(req, res, next) {
    console.log('inside removeLikes---->', req.params.id, req.session.user.username);
    const dislike = { 'user': req.session.user.username, 'post': parseInt(req.params.id) };
    likes.removeLike(dislike)
    .then(workDislike => {
      console.log('LIKE DISLIKED ----->', workDislike);
      next()
    })
    .catch(err => {
      console.log('LIKE DISLIKE NOT WORKING---->', err);
      next(err);
    });
  },

  getLikes(req, res, next) {

  },
};
