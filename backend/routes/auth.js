const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');

router.post('/signup', (req, res) => {
  const { name, username, email, password } = req.body;
  if (!email || !username || !password || !name) {
    return res.status(422).json({ error: 'Please type all the fields' });
  }
  User.findOne({ $or: [{ username: username }, { email: email }] })
    .then((savedUser) => {
      if (savedUser) {
        console.log(savedUser.username === username);
        console.log(savedUser.email === email);
        if (savedUser.username === username) {
          return res.status(422).json({ error: 'Username already exists' });
        }
        if (savedUser.email === email) {
          return res.status(422).json({ error: 'Email already exists' });
        }
      }

      bcrypt.hash(password, saltRounds).then((hashedPassword) => {
        const user = new User({
          username,
          email,
          password: hashedPassword,
          name,
        });

        user
          .save()
          .then(() => {
            res.json({ message: 'Saved successfully' });
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
            'wassup',
          );
          const {
            _id,
            name,
            username,
            email,
            avatar,
            bio,
            followers,
            following,
          } = savedUser;
          res.json({
            token,
            user: {
              _id,
              name,
              username,
              email,
              avatar,
              bio,
              followers,
              following,
            },
          });
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
