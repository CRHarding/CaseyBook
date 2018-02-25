module.exports = {
  showUser(req, res) {
    res.render('profiles/index', {
      user: res.locals.user,
    });
  },

  showRegister(req, res) {
    res.render('register');
  },

  showEdit(req, res, next) {

  },
};
