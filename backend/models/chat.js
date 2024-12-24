const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chat = new Schema(
  {
    members: [],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chat', Chat);
