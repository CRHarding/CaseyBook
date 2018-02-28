const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

const profilesRouter = require('./routes/profile_routes');
const authRouter = require('./routes/auth_routes');
const friendRouter = require('./routes/friend_routes');

const app = express();
app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'tilt huff blown back',
}));

app.use(function (req, res, next) {
  const err = req.session.error;
  const msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.friends = false;
  res.locals.pending = false;
  res.locals.isLoggedIn = false;
  res.locals.message = ' ';
  if (err) res.locals.message = `<p class="msg error">${err}</p>`;
  if (msg) res.locals.message = `<p class="msg success">${msg}</p>`;
  next();
});

app.use('/profile', profilesRouter);
app.use('/authenticate', authRouter);
app.use('/friend', friendRouter);

app.get('/*', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
