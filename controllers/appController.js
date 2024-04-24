const User = require('../model/User');
const { ShoppingList } = require('../model/ShoppingList');

const errorHandler = require('../middleware/errorHandler');

module.exports.newShoppingList_post = async (req, res, next) => {
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
    console.log(err);
    errorHandler(err, req, res);
  }
};

module.exports.removeShoppingList_delete = async (req, res, next) => {
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
