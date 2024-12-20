const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === Bearer wassup
  if (!authorization) {
    res.status(401).json({ error: 'you must be login' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'wassup', (err, payload) => {
    if (err || !payload) {
      res.status(401).json({ error: 'you must be login' });
    }

    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
