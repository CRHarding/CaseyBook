const users = require('../models/profileDB');

module.exports = {
  showUser(req, res) {
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

    if (res.locals.totalLikes) {
      totalLikes = res.locals.totalLikes;
    } else {
      totalLikes = false;
    }

    let posts = [];
    console.log(res.locals.posts);
    if (res.locals.posts) {
      res.locals.posts.forEach(function (post) {
        if (totalLikes) {
          postLikes = totalLikes.filter(totalLikes => (totalLikes.post_id === post.post_id));
          posts.push({ 'author': post.user_id, 'content': post.content, 'likes': postLikes, 'post_id': post.id });
        } else {
          posts = res.locals.posts;
        }
      });
    } else {
      posts = false;
    }

    console.log(posts);
    console.log('TOTAL LIKES----->', totalLikes);
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
      userPosts: posts,
    });
  },

  showFriendPage(req, res) {
    if (res.locals.areFriends) {
      friendPosts = res.locals.privateFriendPosts;
    } else {
      friendPosts = res.locals.publicFriendPosts;
    }

    if (res.locals.totalLikes) {
      totalLikes = res.locals.totalLikes;
    } else {
      totalLikes = false;
    }

    let posts = [];
    if (friendPosts) {
      friendPosts.forEach(function (post) {
        console.log('post----->', post);
        if (totalLikes) {
          console.log('TOTAL LIKES', totalLikes);
          console.log('TOTALLIKES.ID / POST.ID', totalLikes[0].id, post.id);
          postLikes = totalLikes.filter(totalLikes => (totalLikes.id === post.id));
          posts.push({ 'author': post.user_id, 'content': post.content, 'likes': postLikes[0].count, 'post_id': post.id });
        } else {
          posts = friendPosts;
        }
      });
    } else {
      posts = false;
    }

    console.log(posts);
    res.render('profiles/friendPage', {
      friendUser: res.locals.friendUser,
      user: req.session.user,
      pending: res.locals.pending,
      friends: res.locals.friends,
      areFriends: res.locals.areFriends,
      isLoggedIn: req.session.isLoggedIn,
      friendPosts: posts,
      alreadyLikes: res.locals.alreadyLikes,
    });
  },

  showNewUser(req, res) {
    res.render('profiles/homepage', {
      showProfile: true,
      user: req.session.user,
      pending: false,
      findPending: false,
      isLoggedIn: req.session.isLoggedIn,
      userPosts: false,
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

  showBack(req, res) {
    res.redirect('back');
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
