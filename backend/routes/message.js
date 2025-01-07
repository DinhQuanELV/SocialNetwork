const express = require('express');
const router = express.Router();

const messageController = require('../controllers/MessageController');
const requireLogin = require('../middleware/requireLogin');

router.post('/create', requireLogin, messageController.create);
router.get('/show/:chatId', requireLogin, messageController.show);

module.exports = router;
