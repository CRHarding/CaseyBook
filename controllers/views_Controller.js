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

    console.log('before---> ', req.session.nonFriends);
    if (req.session.nonFriends === 'none') {
      req.session.nonFriends = req.session.users;
    };

    console.log('pendingFriends, pending, nonFriends', req.session.pendingFriends, showPending, showNonFriends);
    console.log('after--->', req.session.nonFriends);
    res.render('profiles/homepage', {
      user: req.session.user,
      users: req.session.nonFriends,
      pendingFriends: req.session.pendingFriends,
      pending: showPending,
      nonFriends: showNonFriends,
      areFriends: res.locals.areFriends,
      showProfile: true,
    });
  },

  showFriendPage(req, res) {
    console.log('inside showfriendpage -->', req.params.id, res.locals.pending, res.locals.friends);
    res.render('profiles/friendPage', {
      user: req.params.id,
      pending: res.locals.pending,
      friends: res.locals.friends,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res) {
    res.render('profiles/edit', {
      user: req.session.user,
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
    });
  },
};
