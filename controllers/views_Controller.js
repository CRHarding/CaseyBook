module.exports = {
  showUser(req, res) {
    console.log('inside show user --->', req.session.user);
    res.render('profiles/index', {
      user: req.session.user,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res, next) {

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
