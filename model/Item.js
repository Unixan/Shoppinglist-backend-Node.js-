const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Unit: {
    type: String,
    required: true,
    default: 'Pcs',
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Item = mongoose.model('item', itemSchema);

module.exports.Item = Item;
module.exports.itemSchema = itemSchema;
