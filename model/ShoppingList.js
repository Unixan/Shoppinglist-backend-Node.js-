const mongoose = require('mongoose');
const { productSchema } = require('./Product');
const {
  validateId,
  validateListAndUser,
} = require('../middleware/logisticsMethods');

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

shoppingListSchema.statics.deleteShoppingList = async function (
  userId,
  listId
) {
  if (!validateId(userId) || !validateId(listId)) {
    throw Error('ValidationError');
  }
  const list = await this.findOne({ _id: listId });
  if ((valid = validateListAndUser(list, userId))) throw Error(valid);
  await this.deleteOne({ _id: listId });
  return 'List ' + list.name + ' deleted';
};

shoppingListSchema.statics.addItemToList = async function (
  userId,
  listId,
  product
) {
  if (!validateId(userId) || !validateId(listId))
    throw Error('ValidationError');
  const list = await this.findOne({ _id: listId });
  if ((valid = validateListAndUser(list, userId))) throw Error(valid);
  list.products.push({ ...product, quantity: 1, isDone: false });
  await list.save();
  return 'Item added';
};

shoppingListSchema.statics.removeItemFromList = async function (
  userId,
  listId,
  productId
) {
  if (!validateId(userId) || !validateId(userId))
    throw Error('ValidationError');
  const list = await this.findOne({ _id: listId });
  if ((valid = validateListAndUser(list, userId))) throw Error(valid);
  const productIndex = list.products.findIndex(
    (product) => product._id.toString() === productId
  );
  if (productIndex === -1) throw Error('productNotFoundError');
  const item = list.products.splice(productIndex, 1);
  console.log(item);
  await list.save();
  return item[0].quantity + ' ' + item[0].name + ' removed successfully';
};

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = {
  ShoppingList,
  shoppingListSchema,
};
