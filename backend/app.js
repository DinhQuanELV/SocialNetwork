const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri)
  .then(() => console.log('Connect successfully'))
  .catch((err) => {
    console.log(err);
  });

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(cors());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.get('/', (req, res) => {
  res.send('Wassup');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
