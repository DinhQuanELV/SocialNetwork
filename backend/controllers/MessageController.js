const mongoose = require('mongoose');

const Message = require('../models/message');

class MessageController {
  // [POST] /message/create
  create(req, res, next) {
    const { chatId, senderId, text } = req.body;
    const message = new Message({ chatId, senderId, text });

    message
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  // [GET] /message/:chatId
  show(req, res, next) {
    const { chatId } = req.params;

    Message.find({ chatId })
      .then((message) => {
        res.status(200).json(message);
      })
      .catch(next);
  }
}

module.exports = new MessageController();
