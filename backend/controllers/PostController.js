const mongoose = require('mongoose');
const Post = require('../models/post');

class PostController {
  // [GET] /post/showAll
  showAll(req, res, next) {
    Post.find()
      .populate('postedBy', '_id username avatar')
      .populate('comments.postedBy', '_id username avatar')
      .sort('-createdAt')
      .then((posts) => {
        res.json({ posts });
      })
      .catch(next);
  }

  // [GET] /post/showFollowing
  showFollowing(req, res, next) {
    Post.find({ postedBy: { $in: req.user.following } })
      .populate('postedBy', '_id username avatar')
      .populate('comments.postedBy', '_id username avatar')
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
      .populate('postedBy', '_id username avatar')
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
      .populate('comments.postedBy', '_id username avatar')
      .populate('postedBy', '_id username avatar')
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
      .populate('comments.postedBy', '_id username avatar')
      .populate('postedBy', '_id username avatar')
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
      .populate('comments.postedBy', '_id username avatar')
      .populate('postedBy', '_id username avatar')
      .exec()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  }

  // [PATCH] /post/edit/:postId
  async edit(req, res) {
    try {
      const postId = req.params.postId;
      const title = req.params.title;
      console.log(req.params);

      // console.log(postId, title);

      const storePost = await Post.findOne({ _id: postId }).populate(
        'postedBy',
        '_id username avatar',
      );
      if (!storePost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      storePost.title = title;
      // console.log(storePost);

      return res.status(200).json(await storePost.save());
    } catch (err) {
      console.log(err);
    }
  }

  // [DELETE] /post/remove/:postId
  remove(req, res, next) {
    Post.findByIdAndDelete(req.params.postId)
      .then((post) => {
        res.json({ message: 'Post deleted successfully' });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new PostController();
