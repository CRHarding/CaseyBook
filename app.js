const express = require('express');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Hello, World');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
