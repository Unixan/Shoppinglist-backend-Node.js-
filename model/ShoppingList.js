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
  console.log(res.errors);
  if (res) {
    return res._id;
  }
  throw Error("Couldn't create list");
};

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = ShoppingList;
module.exports.shoppingListSchema = shoppingListSchema;
