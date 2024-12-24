const express = require('express');
const router = express.Router();

const chatController = require('../controllers/ChatController');

router.post('/create', chatController.create);
router.get('/:userId', chatController.findUserChats);
router.get('/find/:firstId/:secondId', chatController.findChat);

module.exports = router;
