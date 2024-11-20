const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(
  'mongodb+srv://dq:6RDl85K40J979yGe@dq.ktpaz.mongodb.net/?retryWrites=true&w=majority&appName=dq',
);
mongoose.connection.on('connected', () => {
  console.log('connect successfully');
});
mongoose.connection.on('error', (err) => {
  console.log('connect failure');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
