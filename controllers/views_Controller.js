module.exports = {
  showUser(req, res) {
    console.log('inside show user --->', req.session.user);
    console.log('inside show users ---->', req.session.users);
    res.render('profiles/index', {
      user: req.session.user,
      users: req.session.users,
    });
  },

  showFriendPage(req, res) {
    console.log('inside show friend --->', req.params.id);
    res.render('profiles/friendPage', {
      user: req.params.id,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res) {
    console.log('inside show edit -->', req.params.id);
    res.render('profiles/edit', {
      user: req.params.id,
    });
  },

  showLogin(req, res) {
    res.render('login');
  },

  showDelete(req, res) {
    res.render('delete');
  },

  showHome(req, res) {
    res.redirect('/index');
  },
};
