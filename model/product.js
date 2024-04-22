const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    default: 'Pcs',
  },
  quantity: {
    type: Number,
  },
  isDone: {
    type: Boolean,
  },
  barcode: {
    type: String,
    unique: true,
  },
  nutritionalValues: {},
});

const Product = mongoose.model('product', productSchema);

module.exports.Product = Product;
module.exports.productSchema = productSchema;
