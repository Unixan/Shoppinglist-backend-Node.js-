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
    sparse: true,
  },
});

productSchema.statics.addItem = async function (product) {
  const productToFind = await this.findOne({
    barcode: product.barcode,
  });
  if (productToFind) return undefined;
  this.create(product);
  return 'new item added';
};

const Product = mongoose.model('product', productSchema);

module.exports = { Product, productSchema };
