const posts = require('../models/postDB');

module.exports = {
  addPost(req, res, next) {
    if (!req.body.rest) {
      req.body.rest = 1;
    }

    if (!req.params.id) {
      req.params.id = req.session.user.email;
    }

    const postObject = { 'user_id': req.session.user.email, 'friend_id': req.params.id, 'content': req.body.content, 'rest': req.body.rest };
    posts.addPost(postObject)
    .then(post => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  getYourPosts(req, res, next) {
    posts.getYourPosts(req.session.user.email)
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
      next(err);
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

  getPostById(req, res, next) {
    posts.getPostById(req.params.id)
    .then(post => {
      res.locals.editPost = post;
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  editPost(req, res, next) {
    if (!req.body.rest) {
      req.body.rest =1;
    }

    const postToEdit = { 'id': req.params.id, 'content': req.body.content, 'rest': req.body.rest };
    posts.editPost(postToEdit)
    .then(post => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },

  deletePost(req, res, next) {
    posts.deletePost(req.params.id)
    .then(post => {
      next();
    })
    .catch(err => {
      next(err);
    });
  },
};
