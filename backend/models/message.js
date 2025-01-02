const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', Message);
