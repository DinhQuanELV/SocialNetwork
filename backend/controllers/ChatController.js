const mongoose = require('mongoose');

const Chat = require('../models/chat');
const User = require('../models/user');

class ChatController {
  // [POST] /chat/create
  create(req, res, next) {
    const { senderId, receiverId } = req.body;
    Chat.findOne({ members: { $all: [senderId, receiverId] } })
      .then((chat) => {
        if (chat) {
          res.status(200).json(chat);
        } else {
          const newChat = new Chat({
            members: [senderId, receiverId],
          });
          return newChat.save();
        }
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  //   [GET] /chat/:userId
  show(req, res, next) {
    const userId = req.params.userId;
    Chat.find({
      members: { $in: [userId] },
    })
      .then((chats) => {
        return Promise.all(
          chats.map((chat) => {
            const receiverId = chat.members.find((member) => member !== userId);
            return User.findById(receiverId).then((user) => {
              return {
                user: {
                  receiverId: user._id,
                  username: user.username,
                  avatar: user.avatar,
                },
                chatId: chat._id,
              };
            });
          }),
        );
      })
      .then((chatUserData) => {
        res.status(200).json(chatUserData);
      })
      .catch(next);
  }
}

module.exports = new ChatController();
