const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const profilesRouter = require('./routes/profile_routes');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    title: `Casey Book!`,
    heading: `Welcome to Casey Book!`,
    subheading: `It's like Facebook, only made by some guy named 'Casey'.`,
  });
});

app.use('/profile', profilesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
