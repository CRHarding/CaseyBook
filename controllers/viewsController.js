const users = require('../models/profileDB');

module.exports = {
  showUser(req, res) {
    // General checking for if req.session / res.locals variables exist
    // If not give them general fallback values

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

//Take the passed post information and use that to populate a users posts
//Also used to pull together posts and likes into one object

    let posts = [];
    if (res.locals.posts) {
      console.log(res.locals.posts);
      res.locals.posts.forEach(function (post) {
        if (totalLikes) {
          const dayName = post.date_posted.getDayName();
          const day = post.date_posted.getDay();
          const month = post.date_posted.getMonthName();
          const year = post.date_posted.getFullYear();
          const postDate = dayName + ', ' + month +' ' +  day + ', ' + year;
          postLikes = totalLikes.filter(totalLikes => (totalLikes.id === post.id));
          if (!postLikes[0]) {
            posts.push({ 'author': post.user_id, 'content': post.content, 'likes': 0, 'post_id': post.id, 'datePosted': postDate });
          } else {
            posts.push({ 'author': post.user_id, 'content': post.content, 'likes': postLikes[0].count, 'post_id': post.id, 'datePosted': postDate });
          }
        } else {
          posts = res.locals.posts;
        }
      });
    } else {
      posts = false;
    }

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
//General checking for res.locals / req.session values, setting them to
// fallback values if not supplied

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

//Populate friend posts / likes
    let posts = [];
    if (friendPosts) {
      friendPosts.forEach(function (post) {
        if (totalLikes) {
          const day = post.date_posted.getDay();
          const month = post.date_posted.getMonth();
          const year = post.date_posted.getFullYear();
          const postDate = month + ', ' + day + ', ' + year;
          postLikes = totalLikes.filter(totalLikes => (totalLikes.id === post.id));
          if (!postLikes[0]) {
            posts.push({ 'author': post.user_id, 'content': post.content, 'likes': 0, 'post_id': post.id, 'datePosted': postDate });
          } else {
            posts.push({ 'author': post.user_id, 'content': post.content, 'likes': postLikes[0].count, 'post_id': post.id, 'datePosted': postDate });
          }

        } else {
          posts = friendPosts;
        }
      });
    } else {
      posts = false;
    }

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

//Show a new user, most variables set to false since there aren't any
//posts / friends yet.

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

  showPostEdit(req, res) {
    res.render('profiles/editPost', {
      post: res.locals.editPost,
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
    res.render('index', {
      isLoggedIn: req.session.isLoggedIn,
      users: req.session.users,
      user: req.session.user,
    });
  },
};
