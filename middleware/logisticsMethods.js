const mongoose = require('mongoose');

module.exports.validateListAndUser = (list, userId) => {
  if (!list) return 'listError';
  if (!list.users.includes(userId)) return 'accessError';
  return null;
};

module.exports.findProduct = (list, productId) => {
  return !list.products.find((product) => product._id.toString() === productId)
    ? true
    : false;
};

module.exports.validateId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
