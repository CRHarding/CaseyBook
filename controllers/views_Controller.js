module.exports = {
  showUser(req, res) {
    res.render('profiles/index', {
      user: req.session.user,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res, next) {

  },
};
