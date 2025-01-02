const mongoose = require('mongoose');
const Post = require('../models/post');

class PostController {
  // [GET] /post/showAll
  showAll(req, res, next) {
    Post.find()
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')
      .sort('-createdAt')
      .then((posts) => {
        res.json({ posts });
      })
      .catch(next);
  }

  // [GET] /post/showFollowing
  showFollowing(req, res, next) {
    Post.find({ postedBy: { $in: req.user.following } })
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')
      .sort('-createdAt')
      .then((posts) => {
        res.json({ posts });
      })
      .catch(next);
  }

  // [POST] /post/create
  create(req, res, next) {
    const { title, pic } = req.body;
    if (!pic) {
      return res.status(422).json({ error: 'Please add all the fields' });
    }
    req.user.password = undefined;
    const post = new Post({
      title,
      image: pic,
      postedBy: req.user,
    });
    post
      .save()
      .then((result) => {
        res.json({ post: result });
      })
      .catch(next);
  }

  // [GET] /post/myPost
  myPost(req, res, next) {
    Post.find({ postedBy: req.user.id })
      .populate('postedBy', '_id name')
      .sort('-createdAt')
      .then((myPost) => {
        res.json({ myPost });
      })
      .catch(next);
  }

  // [PUT] /post/like
  like(req, res, next) {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      },
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

  // [PUT] /post/unlike
  unlike(req, res, next) {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      },
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

  // [PUT] /post/comment
  comment(req, res, next) {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      },
    )
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

  // [DELETE] /post/remove/:postId
  remove(req, res, next) {}
}

module.exports = new PostController();
