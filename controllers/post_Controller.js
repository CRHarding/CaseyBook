const posts = require('../models/postDB');

module.exports = {
  addPost(req, res, next) {
    console.log(req.session.user.username);
    console.log(req.body);
    const postObject = { 'user_id': req.session.user.username, 'content': req.body.content, 'rest': 1 };
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
      console.log('GETTING YOUR POSTS WORKED----->', posts);
      next();
    })
    .catch(err => {
      console.log('GETTING YOUR  POSTS FAILED----->', err);
      next(err);
    });
  },

  getAllFriendPosts(req, res, next) {
    posts.getFriendPosts(req.params.id)
    .then(posts => {
      res.locals.privateFriendPosts = posts;
      console.log('GETTING FRIEND POSTS WORKED ----->', posts);
      next();
    })
    .catch(err => {
      console.log('GETTING FRIEND POSTS FAILED -----', err);
    });
  },

  getPublicFriendPosts(req, res, next) {
    posts.getPublicFriendPosts(req.params.id)
    .then(posts => {
      res.locals.publicFriendPosts = posts;
      console.log('GETTING PUBLIC FRIEND POSTS WORKED----->', posts);
      next();
    })
    .catch(err => {
      console.log('GETTING PUBLIC FRIEND POSTS FAILED----->', err);
      next(err);
    });
  },
};
