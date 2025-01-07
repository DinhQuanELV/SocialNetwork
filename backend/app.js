const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const socketIo = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5000;
const uri = process.env.ATLAS_URI;

const route = require('./routes');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000/',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message:send', (data, cb) => {
    const chatId = data.chatId;
    data.content = data.message;
    delete data.message;
    cb(data);
    socket.to(chatId).emit('message:sent', data);
  });
  socket.on('chat:join', (id) => {
    socket.join(id);
    console.log('user joined: ', id);
  });
  socket.on('chat:leave', (id) => {
    socket.leave(id);
    console.log('user left: ', id);
  });
});

mongoose
  .connect(uri)
  .then(() => console.log('Connect successfully'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/-WWW-urlencoded
app.use(bodyParser.json()); // parse application/json

route(app);

app.get('/', (req, res) => {
  res.send('Wassup');
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
