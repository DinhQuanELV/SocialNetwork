const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.get('/allpost', requireLogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/following', requireLogin, (req, res) => {
  // if postedBy in following
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/createpost', requireLogin, (req, res) => {
  const { title, pic } = req.body;
  if (!title || !pic) {
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
    .catch((err) => {
      console.log(err);
    });
});

router.get('/mypost', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user.id })
    .populate('postedBy', '_id name')
    .then((myPost) => {
      res.json({ myPost });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/like', requireLogin, (req, res) => {
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
    .catch((err) => res.status(422).json(err));
});

router.put('/unlike', requireLogin, (req, res) => {
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
    .catch((err) => res.status(422).json(err));
});

router.put('/comment', requireLogin, (req, res) => {
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
    .catch((err) => res.status(422).json(err));
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  //
});

module.exports = router;
