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
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(listId)
  ) {
    throw Error('ValidationError');
  }
  const list = await this.findOne({ _id: listId });
  if (list) {
    if (list.users.includes(userId)) {
      await this.deleteOne({ _id: listId });
      return 'List deleted';
    } else {
      throw Error('userError');
    }
  } else {
    throw Error('listError');
  }
};

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = {
  ShoppingList,
  shoppingListSchema,
};
