const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'You must be login' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, jwtSecretKey, (err, payload) => {
    if (err || !payload) {
      return res.status(401).json({ error: 'You must be login' });
    }

    const { _id } = payload;
    User.findById(_id)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};
