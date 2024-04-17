const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { shoppingListSchema } = require('./ShoppingList');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [8, 'Must be atleast 8 chars'],
  },
  shoppingLists: {
    type: [shoppingListSchema],
    default: [],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
