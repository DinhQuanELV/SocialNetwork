const express = require('express');
const router = express.Router();

const requireLogin = require('../middleware/requireLogin');
const chatController = require('../controllers/ChatController');

router.post('/create', requireLogin, chatController.create);
router.get('/show/:userId', requireLogin, chatController.show);

module.exports = router;
