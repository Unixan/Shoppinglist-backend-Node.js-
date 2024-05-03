const mongoose = require('mongoose');
const { productSchema } = require('./Product');

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  products: [productSchema],
});

shoppingListSchema.statics.addShoppingList = async function (userId, name) {
  if (!validateId(userId || !name)) throw Error('ValidationError');
  const res = await this.create({ name, users: [userId] });
  if (res) {
    return res._id;
  }
  throw Error("Couldn't create list");
};

shoppingListSchema.statics.addItemToList = async function (
  userId,
  listId,
  product
) {
  if (!validateId(userId) || !validateId(listId))
    throw Error('ValidationError');
  const list = await this.findOne({ _id: listId });
  if (!list) throw Error('listError');
  if (!list.users.includes(userId)) throw Error('userError');
  list.products.push({ ...product, quantity: 1, isDone: false });
  await list.save();
  return 'Item added';
};

shoppingListSchema.statics.deleteShoppingList = async function (
  userId,
  listId
) {
  if (!validateId(userId) || !validateId(listId)) {
    throw Error('ValidationError');
  }
  const list = await this.findOne({ _id: listId });
  if (!list) throw Error('listError');
  if (!list.users.includes(userId)) throw Error('userError');
  await this.deleteOne({ _id: listId });
  return 'List ' + list.name + ' deleted';
};

const validateId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = {
  ShoppingList,
  shoppingListSchema,
};
