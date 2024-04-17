const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

const dbURI = 'mongodb://localhost:27017/';

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('listening on port 3000');
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(authRoutes);
