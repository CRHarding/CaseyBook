module.exports = {
  showUser(req, res) {
    res.render('user/index', {
      user: res.locals.user,
    });
  },
};
