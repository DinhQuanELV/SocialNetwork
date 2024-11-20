const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'user already exists with that email' });
      }
      bcrypt.hash(password, saltRounds).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: 'saved successfully' });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'Please provide email or password' });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: 'Invalid email or password' });
      }
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          // res.json({ message: 'login successful' });
          const token = jwt.sign(
            {
              _id: savedUser._id,
            },
            'asdf',
          );
          res.json({ token });
        } else {
          return res.status(422).json({ error: 'Invalid email or password' });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
