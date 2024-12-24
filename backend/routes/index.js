const chatRouter = require('./chat');
const messageRouter = require('./message');

function route(app) {
  app.use('/chat', chatRouter);
  app.use('/message', messageRouter);
}

module.exports = route;
