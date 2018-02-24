const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;
const session = require('express-session');

const profilesRouter = require('./routes/profile_routes');
const authRouter = require('./routes/auth_routes');

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

app.get('/', (req, res) => {
  res.render('index', {
    title: `Casey Book!`,
    heading: `Welcome to Casey Book!`,
    subheading: `It's like Facebook, only made by some guy named 'Casey'.`,
    showLogin: true,
  });
});

app.use('/profile', profilesRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
