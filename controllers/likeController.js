const likes = require('../models/likeDB');

module.exports = {
  updateLike(req, res, next) {
    if (!res.locals.alreadyLikes) {
      const like = { 'writer': res.locals.friendUser, 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
      console.log(like);
      likes.updateLike(like)
      .then(workLike => {
        console.log('LIKE UPDATED------>', workLike);
        next();
      })
      .catch(err => {
        console.log('LIKE NOT UPDATED', err);
        next(err);
      });
    } else {
      const like = { 'friend': req.session.user.username, 'post': parseInt(req.params.id) };
      likes.removeLike(like)
      .then(workLike => {
        console.log('LIKE DELETED------>', workLike);
        next();
      })
      .catch(err => {
        console.log('LIKE NOT DELETED', err);
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
      console.log('LIKE DISLIKED ----->', workDislike);
      next();
    })
    .catch(err => {
      console.log('LIKE DISLIKE NOT WORKING---->', err);
      next(err);
    });
  },

  getLikes(req, res, next) {
    console.log('req.params / req.session.user -----> ', req.params.id, req.session.user.username);
    console.log(' TYPE OF---->', typeof req.params.id);
    if (typeof req.params.id === 'string') {
      user = req.params.id;
    } else {
      user = req.session.user.username;
    }

    console.log('inside getlikes----->', user);
    likes.getLikes(user)
    .then(totalLikes => {
      console.log('TOTAL LIKES FOR POST ', totalLikes);
      res.locals.totalLikes = totalLikes;
      next();
    })
    .catch(err => {
      console.log('GETTING TOTAL LIKES FAILED---->', err);
      next(err);
    });
  },
};
