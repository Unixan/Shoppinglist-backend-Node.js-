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
    throw Error('passwordError');
  }
  throw Error('emailError');
};

userSchema.statics.addShoppingList = async function (userId, name) {
  try {
    const user = await this.findById(userId);

    if (user) {
      user.shoppingLists.push({ name, isPrivate: true });
      await user.save();
      return 'Shoppinglist added to user ' + user._id;
    } else {
      throw Error('userError');
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError)
      throw Error('validationError');
    else throw Error('createError');
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;
