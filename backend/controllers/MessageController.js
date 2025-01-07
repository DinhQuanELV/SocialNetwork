const mongoose = require('mongoose');

const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chat');

class MessageController {
  // [POST] /message/create
  create(req, res, next) {
    const { chatId, senderId, message, receiverId = '' } = req.body;
    if (!senderId || !message) {
      return res.status(400).json({ error: 'Please add all the fields' });
    }
    if (chatId === 'new' && receiverId) {
      const newChat = new Chat({ members: [senderId, receiverId] });
      newChat
        .save()
        .then((savedChat) => {
          const newMessage = new Message({
            chatId: savedChat._id,
            senderId,
            message,
          });
          return newMessage.save();
        })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(next);
    } else if (!chatId && !receiverId) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    } else {
      const newMessage = new Message({ chatId, senderId, message });
      newMessage
        .save()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch(next);
    }
  }

  // [GET] /message/:chatId
  show(req, res, next) {
    const chatId = req.params.chatId;
    Message.find({ chatId })
      .then((messages) => {
        return Promise.all(
          messages.map((message) => {
            return User.findById(message.senderId).then((user) => {
              return {
                _id: message._id,
                senderId: user._id,
                username: user.username,
                avatar: user.avatar,
                content: message.message,
                createdAt: message.createdAt,
              };
            });
          }),
        );
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }
}

module.exports = new MessageController();
