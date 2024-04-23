const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { shoppingListSchema } = require('./ShoppingList');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Invalid email'],
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [8, 'Must be atleast 8 chars'],
  },
  shoppingLists: {
    type: [shoppingListSchema],
    // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shoppingList' }],
    default: [],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user._id;
    }
    throw Error('Incorrect password');
  }
  throw Error("User doesn't exist");
};

const User = mongoose.model('user', userSchema);

module.exports = User;
