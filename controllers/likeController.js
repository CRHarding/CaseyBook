const likes = require('../models/likeDB');

module.exports = {
  updateLike(req, res, next) {
    if (!res.locals.alreadyLikes) {
      const like = { 'writer': res.locals.friendUser, 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
      likes.updateLike(like)
      .then(workLike => {
        next();
      })
      .catch(err => {
        next(err);
      });
    } else {
      const like = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
      likes.removeLike(like)
      .then(workLike => {
        next();
      })
      .catch(err => {
        next(err);
      });
    }
  },

  alreadyLikes(req, res, next) {
    const like = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
    likes.alreadyLikes(like)
    .then(doesnLike => {
      res.locals.alreadyLikes = true;
      next();
    })
    .catch(err => {
      res.locals.alreadyLikes = false;
      next();
    });
  },

  removeLike(req, res, next) {
    const dislike = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
    likes.removeLike(dislike)
    .then(workDislike => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  getLikes(req, res, next) {
    if (typeof req.params.id === 'string') {
      user = req.params.id;
    } else {
      user = req.session.user.username;
    }

    likes.getLikes(user)
    .then(totalLikes => {
      res.locals.totalLikes = totalLikes;
      next();
    })
    .catch(err => {
      next(err);
    });
  },
};
