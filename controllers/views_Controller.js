const users = require('../models/profileDB');

module.exports = {
  showUser(req, res) {
    console.log('inside show user pending friends ----->', req.session.pendingFriends, req.session.pendingFriends);
    console.log('inside show users nonfriends ---->', req.session.nonFriends);

    if (req.session.pendingFriends) {
      if (req.session.pendingFriends.length > 0) {
        showPending = true;
      } else {
        showPending = false;
      }
    } else {
      showPending = false;
    }

    if (req.session.nonFriends) {
      if (req.session.nonFriends.length > 0) {
        showNonFriends = true;
      } else {
        showNonFriends = false;
      }
    }

    console.log(res.locals.posts);
    console.log('findpendingfriends, pendingFriends, pending, nonFriends', req.session.findPendingFriends, req.session.pendingFriends, showPending, showNonFriends);
    res.render('profiles/homepage', {
      user: req.session.user,
      users: req.session.nonFriends,
      pendingFriends: req.session.pendingFriends,
      pending: showPending,
      nonFriends: showNonFriends,
      areFriends: res.locals.areFriends,
      showProfile: true,
      findPending: req.session.findPending,
      findPendingFriends: req.session.findPendingFriends,
      isLoggedIn: req.session.isLoggedIn,
      posts: res.locals.posts,
    });
  },

  showFriendPage(req, res) {
    console.log('inside showfriendpage -->', res.locals.areFriends, res.locals.pending, res.locals.friends);
    console.log(res.locals.privateFriendPosts);
    console.log(res.locals.publicFriendPosts);
    if (res.locals.areFriends) {
      friendPosts = res.locals.privateFriendPosts;
    } else {
      friendPosts = res.locals.publicFriendPosts;
    };

    console.log('FRIEND POSTS ----->', friendPosts);

    res.render('profiles/friendPage', {
      friendUser: res.locals.friendUser,
      user: req.session.user,
      pending: res.locals.pending,
      friends: res.locals.friends,
      areFriends: res.locals.areFriends,
      isLoggedIn: req.session.isLoggedIn,
      posts: friendPosts,
    });
  },

  showNewUser(req, res) {
    res.render('profiles/homepage', {
      showProfile: true,
      user: req.session.user,
      pending: false,
      findPending: false,
      isLoggedIn: req.session.isLoggedIn,
      posts: false,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res) {
    res.render('profiles/edit', {
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn,
    });
  },

  showLogin(req, res) {
    res.render('login');
  },

  showDelete(req, res) {
    res.render('delete');
  },

  showHome(req, res) {
    console.log(req.session.isLoggedIn);
    res.render('index', {
      isLoggedIn: req.session.isLoggedIn,
      users: req.session.users,
      user: req.session.user,
    });
  },
};
