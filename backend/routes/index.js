const chatRouter = require('./chat');

function route(app) {
  app.use('/chat', chatRouter);
}

module.exports = route;
