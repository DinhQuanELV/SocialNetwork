const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

const PostController = require('../controllers/PostController');

router.get('/showAll', requireLogin, PostController.showAll);
router.get('/following', requireLogin, PostController.showFollowing);
router.post('/create', requireLogin, PostController.create);
router.get('/myPost', requireLogin, PostController.myPost);
router.put('/like', requireLogin, PostController.like);
router.put('/unlike', requireLogin, PostController.unlike);
router.put('/comment', requireLogin, PostController.comment);
router.put('/edit/:postId/:title', requireLogin, PostController.edit);
router.delete('/remove/:postId', requireLogin, PostController.remove);

module.exports = router;
