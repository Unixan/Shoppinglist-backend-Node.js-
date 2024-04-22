const mongoose = require('mongoose');
const { productSchema } = require('./product');

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports.ShoppingList = ShoppingList;
module.exports.shoppingListSchema = shoppingListSchema;
