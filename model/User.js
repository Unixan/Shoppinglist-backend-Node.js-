const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { shoppingListSchema, ShoppingList } = require('./ShoppingList');

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

userSchema.statics.login = async function (email, password) {
  if (!isEmail(email)) throw Error('ValidationError');
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
  if (!validateId(userId) || !name) throw Error('ValidationError');
  const user = await this.findById(userId);
  if (user) {
    user.shoppingLists.push({ name, isPrivate: true });
    await user.save();
    return 'Shoppinglist added to user ' + user._id;
  }
  throw Error('userError');
};

userSchema.statics.addItemToList = async function (userId, listId, product) {
  if (!validateId(userId) || !validateId(listId))
    throw Error('ValidationError');
  const user = await this.findById(userId);
  if (!user) throw Error('userError');
  const list = await user.shoppingLists.find((list) => list._id.equals(listId));
  if (!list) throw Error('listError');
  list.products.push({ ...product, quantity: 1, isDone: false });
  await user.save();
  return 'Item added';
};

userSchema.statics.removeItemFromList = async function (
  userId,
  listId,
  productId
) {
  console.log(userId, listId, productId);
};

userSchema.statics.deleteUser = async function (userId) {
  if (!validateId(userId)) throw Error('ValidationError');
  const user = await this.findById(userId);
  if (!user) throw Error('userError');
  const deletedUser = await this.deleteOne({ _id: userId });
  const shoppingLists = await ShoppingList.find({ users: userId });
  await Promise.all(
    shoppingLists.map(async (list) => {
      list.users = list.users.filter((id) => id.toString() !== userId);
      await list.save();
      return list;
    })
  );
  const deletedPublicShoppingLists = await ShoppingList.deleteMany({
    users: { $size: 0 },
  });
  console.log(shoppingLists);
  return { deletedUser, deletedPublicShoppingLists };
};

userSchema.statics.deleteShoppingList = async function (userId, listId) {
  if (!validateId(userId)) throw Error('ValidationError');
  const user = await this.findById(userId);
  if (user) {
    const index = user.shoppingLists.findIndex((list) =>
      list._id.equals(listId)
    );
    if (index !== -1) {
      user.shoppingLists.splice(index, 1);
      await user.save();
      return 'Shoppinglist deleted';
    }
    throw Error('listError');
  }
  throw Error('userError');
};

const validateId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
