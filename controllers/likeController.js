const likes = require('../models/likeDB');

module.exports = {
//add the user / post id to the like database
  updateLike(req, res, next) {
    if (!res.locals.alreadyLikes) {
      const like = { 'writer': res.locals.friendUser, 'friend': req.session.user.email, 'post': parseInt(req.params.id) };
      likes.updateLike(like)
      .then(workLike => {
        next();
      })
      .catch(err => {
        next(err);
      });
    } else {
      const like = { 'friend': req.session.user.email, 'post': parseInt(req.params.id) };
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
    const like = { 'friend': req.session.user.email, 'post': parseInt(req.params.id) };
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
    const dislike = { 'friend': req.session.user.email, 'post': parseInt(req.params.id) };
    likes.removeLike(dislike)
    .then(workDislike => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },

//get the total likes for a specific user. If req.params.id === string (aka you are
//on the site of a friend), it will pull that users' likes, otherwise you are at your
//homepage and so it grabs those likes
  getLikes(req, res, next) {
    if (typeof req.params.id === 'string') {
      user = req.params.id;
    } else {
      user = req.session.user.email;
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
