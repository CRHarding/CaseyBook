const express = require('express');
const authRouter = express.Router();
import User from '../models/profileDB';
import jwt from 'jsonwebtoken';

authRouter.post('/', (req, res) => {
  const { credentials } = req.body;
  User.findUser({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(user, credentials.password)) {
      const token = generateJWT(user);
      res.json({ user: { email: user.email, token: token } });
    } else {
      res.status(400).json({ errors: { global: 'Invalide credentials' } });
    }
  });
});

function generateJWT(user) {
  return jwt.sign({
    email: user.email,
  }, process.env.SECRET);
}

module.exports = authRouter;
