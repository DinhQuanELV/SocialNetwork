const mongoose = require('mongoose');

const Chat = require('../models/chat');

class ChatController {
  // [POST] /chat/create
  create(req, res, next) {
    const { firstId, secondId } = req.body;
    Chat.findOne({ members: { $all: [firstId, secondId] } })
      .then((chat) => {
        if (chat) {
          res.status(200).json(chat);
        } else {
          const newChat = new Chat({
            members: [firstId, secondId],
          });
          return newChat.save();
        }
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  findUserChats(req, res, next) {
    const userId = req.params.userId;
    Chat.find({
      members: { $in: [userId] },
    })
      .then((chats) => {
        res.status(200).json(chats);
      })
      .catch(next);
  }

  findChat(req, res, next) {
    const { firstId, secondId } = req.params;
    Chat.findOne({
      members: { $all: [firstId, secondId] },
    })
      .then((chat) => {
        res.status(200).json(chat);
      })
      .catch(next);
  }
}

module.exports = new ChatController();
