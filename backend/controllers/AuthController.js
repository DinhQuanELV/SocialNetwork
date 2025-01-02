const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const saltRounds = 10;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

class AuthController {
  signup(req, res, next) {
    const { name, username, email, password } = req.body;
    if (!email || !username || !password || !name) {
      return res.status(400).json({ error: 'Please type all the fields!' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid!' });
    }
    if (
      !validator.isStrongPassword(password, [
        {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
      ])
    ) {
      return res.status(400).json({
        error:
          'Password must have at least 8 characters including a number, a uppercase and a symbol!',
      });
    }
    User.findOne({ $or: [{ username: username }, { email: email }] })
      .then((savedUser) => {
        if (savedUser) {
          if (savedUser.username === username) {
            return res.status(409).json({ error: 'Username already exists!' });
          }
          if (savedUser.email === email) {
            return res.status(409).json({ error: 'Email already exists!' });
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
              res.json({ message: 'Sign up successfully!' });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
        });
      })
      .catch(next);
  }

  login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: 'Please fill email or password!' });
    }
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({ error: 'Invalid email or password!' });
        }
        bcrypt.compare(password, savedUser.password).then((isMatchPassword) => {
          if (!isMatchPassword) {
            return res
              .status(422)
              .json({ error: 'Invalid email or password!' });
          } else {
            const token = jwt.sign(
              {
                _id: savedUser._id,
              },
              jwtSecretKey,
              { algorithm: 'HS256' },
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
          }
        });
      })
      .catch(next);
  }
}

module.exports = new AuthController();
