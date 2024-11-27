const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

mongoose.model('Post', Post);
