const User = require('../model/User');
const { ShoppingList } = require('../model/ShoppingList');
const { Product } = require('../model/Product');
const errorHandler = require('../middleware/errorHandler');

module.exports.newShoppingList_post = async (req, res) => {
  const { name, isPrivate, user } = req.body;
  try {
    let result;
    if (isPrivate) {
      result = await User.addShoppingList(user, name);
    } else {
      result = await ShoppingList.addShoppingList(user, name);
    }
    res.status(201).json({ message: 'Shopping list created', result });
  } catch (err) {
    console.log(err.message);
    errorHandler(err, req, res);
  }
};

module.exports.removeShoppingList_delete = async (req, res) => {
  const { user, isPrivate, shoppingListId } = req.body;
  try {
    let result;
    if (isPrivate) {
      result = await User.deleteShoppingList(user, shoppingListId);
    } else {
      result = await ShoppingList.deleteShoppingList(user, shoppingListId);
    }
    res.status(202).json({ result });
  } catch (err) {
    console.log(err);
    errorHandler(err, req, res);
  }
};

module.exports.addItemToList_put = async (req, res) => {
  const { userId, listId, isPrivate, product } = req.body;
  try {
    let result = { item: '', newItem: '' };
    if (isPrivate) {
      result.item = await User.addItemToList(userId, listId, product);
    } else {
      result.item = await ShoppingList.addItemToList(userId, listId, product);
    }
    if (product.barcode) {
      result.newItem = await Product.addItem(product);
    }
    res.status(200).json(result);
  } catch (err) {
    errorHandler(err, req, res);
  }
};
