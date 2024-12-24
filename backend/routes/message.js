const express = require('express');
const router = express.Router();

const messageController = require('../controllers/MessageController');

router.post('/create', messageController.create);
router.get('/:chatId', messageController.show);

module.exports = router;
