const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

//middleware
app.use(express.json());

const dbURI = 'mongodb://localhost:27017/shoppinglist';

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('listening on port 3000');
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(authRoutes);
