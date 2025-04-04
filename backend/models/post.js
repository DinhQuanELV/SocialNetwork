const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', Post);
