const mongoose = require('mongoose');
const { itemSchema } = require('./Item');

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

const ShoppingList = mongoose.model('shoppingList', shoppingListSchema);

module.exports.ShoppingList = ShoppingList;
module.exports.shoppingListSchema = shoppingListSchema;
