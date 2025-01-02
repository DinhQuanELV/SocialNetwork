const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

const PostController = require('../controllers/PostController');

router.get('/showAll', requireLogin, PostController.showAll);
router.get('/following', requireLogin, PostController.showFollowing);
router.post('/createPost', requireLogin, PostController.create);
router.get('/myPost', requireLogin, PostController.myPost);
router.put('/like', requireLogin, PostController.like);
router.put('/unlike', requireLogin, PostController.unlike);
router.put('/comment', requireLogin, PostController.comment);
router.delete('/remove/:postId', requireLogin, PostController.remove);

module.exports = router;
