module.exports = {
  showUser(req, res) {
          console.log('inside show user --->', req.session.user, req.session.users);
    res.render('profiles/homepage', {
      user: req.session.user,
      users: req.session.users,
      areUser: true,
    });
  },

  showFriendPage(req, res) {
    console.log('inside showfriendpage -->', req.params.id, res.locals.friends, res.locals.pending);
    res.render('profiles/friendPage', {
      user: req.params.id,
      friends: res.locals.friends,
      pending: res.locals.pending,
      areUser: false,
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
