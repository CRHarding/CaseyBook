const posts = require('../models/postDB');

module.exports = {
  addPost(req, res, next) {
    if (!req.body.rest) {
      req.body.rest = 1;
    }

    const postObject = { 'user_id': req.session.user.username, 'content': req.body.content, 'rest': req.body.rest };
    posts.addPost(postObject)
    .then(post => {
      console.log('ADDING POST WORKED ---->', post);
      next();
    })
    .catch(err => {
      console.log('ADDING POST FAILED ---->', err);
      next(err);
    });
  },

  getYourPosts(req, res, next) {
    posts.getYourPosts(req.session.user.username)
    .then(posts => {
      res.locals.posts = posts;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  getAllFriendPosts(req, res, next) {
    posts.getAllFriendPosts(req.params.id)
    .then(posts => {
      res.locals.privateFriendPosts = posts;
      next();
    })
    .catch(err => {
    });
  },

  getPublicFriendPosts(req, res, next) {
    posts.getPublicFriendPosts(req.params.id)
    .then(posts => {
      res.locals.publicFriendPosts = posts;
      next();
    })
    .catch(err => {
      next(err);
    });
  },
};
