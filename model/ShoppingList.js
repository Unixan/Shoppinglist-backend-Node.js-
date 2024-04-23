const mongoose = require('mongoose');
const { productSchema } = require('./Product');

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
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

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports = ShoppingList;
module.exports.shoppingListSchema = shoppingListSchema;
