module.exports = {
  showUser(req, res) {
    res.render('profiles/index', {
      user: req.session.user,
      users: req.session.users,
    });
  },

  showFriendPage(req, res) {
    res.render('profiles/friendPage', {
      user: req.params.id,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res) {
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
