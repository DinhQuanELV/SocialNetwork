const authRouter = require('./auth');
const userRouter = require('./user');
const postRouter = require('./post');
const chatRouter = require('./chat');
const messageRouter = require('./message');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/post', postRouter);
  app.use('/chat', chatRouter);
  app.use('/message', messageRouter);
}

module.exports = route;
