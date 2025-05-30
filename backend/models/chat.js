const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chat = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chat', Chat);
