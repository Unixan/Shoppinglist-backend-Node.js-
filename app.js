const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//middleware
app.use(express.json());
app.use(errorHandler);

// routes

app.use(authRoutes);
app.use(appRoutes);

const dbURI = 'mongodb://localhost:27017/shoppinglist';

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('listening on port 3000');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
