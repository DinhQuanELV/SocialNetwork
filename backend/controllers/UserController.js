const mongoose = require('mongoose');

const Post = require('../models/post');
const User = require('../models/user');

class UserController {
  // [GET] /user/:id
  userProfile(req, res, next) {
    User.findOne({ _id: req.params.id })
      .lean()
      .select('-password')
      .then((user) => {
        Post.find({ postedBy: req.params.id })
          .populate('postedBy', '_id name')
          .exec()
          .then((posts) => {
            res.json({ user, posts });
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      })
      .catch(next);
  }

  // [PUT] /user/follow
  follow(req, res, next) {
    User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      },
    )
      .lean()
      .select('-password')
      .then(() => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { following: req.body.followId },
          },
          {
            new: true,
          },
        )
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      })
      .catch(next);
  }

  //   [PUT] /user/unfollow
  unfollow(req, res, next) {
    User.findByIdAndUpdate(
      req.body.followId,
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      },
    )
      .lean()
      .select('-password')
      .then(() => {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: { following: req.body.followId },
          },
          {
            new: true,
          },
        )
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      })
      .catch(next);
  }

  // [PUT] /user/updateAvatar
  updateAvatar(req, res, next) {
    User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { avatar: req.body.avatar },
      },
      {
        new: true,
      },
    )
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

  // [POST] /user/search
  search(req, res, next) {
    let userPattern = new RegExp('^' + req.body.query);
    User.find({ email: { $regex: userPattern } })
      .lean()
      .select('_id name email avatar')
      .then((user) => {
        res.json({ user });
      })
      .catch(next);
  }

  // [GET] /user/showAllUsers
  showAll(req, res, next) {
    const userId = req.params.userId;
    User.find({ _id: { $ne: userId } })
      .lean()
      .then((users) => {
        return Promise.all(
          users.map((user) => {
            return {
              receiverId: user._id,
              username: user.username,
              avatar: user.avatar,
            };
          }),
        );
      })
      .then((userList) => {
        res.json(userList);
      })
      .catch(next);
  }
}

module.exports = new UserController();
