const express = require('express');
const router = express.Router();

const requireLogin = require('../middleware/requireLogin');
const UserController = require('../controllers/UserController');

router.get('/:id', requireLogin, UserController.userProfile);
router.put('/follow', requireLogin, UserController.follow);
router.put('/unfollow', requireLogin, UserController.unfollow);
router.put('/updateAvatar', requireLogin, UserController.updateAvatar);
router.post('/search', UserController.search);

module.exports = router;
