const users = require('../models/profileDB');
const hasher = require('pbkdf2-password')();

module.exports = {
  authenticate(req, res, next) {
    const { username, password } = req.body;
    console.log('Authenticating %s: %s', username, password);
    const user = users.findByUsername(username);
    if (!user) return fn(new Error('cannot find user'));
    hasher({ password: inputPassword, salt: user.salt }, (err, pass, salt, hash) => {
      console.log(hash);
      console.log(user.hash);
      if (hash !== user.hash) return fn(new Error('Incorrect password'));
      if (err) return fn(err);
      return fn(null, user);
    });
  },

  createMessage((req, res, next) => {
    const err = req.session.error;
    const msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = ' ';
    if (err) res.locals.message = `<p class ="msg error">${err}</p>`;
    if (msg) res.locals.message = `<p class="msg success">${msg}</p>`;
    next();
  }),

  authRouter.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'tilt huff blown back',
  }));

  authRouter.post('/login',

  (req, res) => {

    authenticate(username, password, (err, user) => {
      console.log('authenticate');
      console.log(err);
      console.log(user);
      if (err) {
        req.session.error = 'Authentication failed. Please try again';
        res.redirect('/login');
      } else {
        req.session.regenerate(() => {
          req.session.user = user;
          req.session.success = 'Welcome!';
          res.redirect('back');
        });
      }
    });
  }),


};
