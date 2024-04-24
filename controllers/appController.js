const User = require('../model/User');
const ShoppingList = require('../model/ShoppingList');

const handleErrors = (err) => {
  let error = { message: '' };
  if (err.message === 'userError') error.message = 'User not found';
  if (err.message === 'listError') error.message = 'Shoppinglist not found';
  if (err.message === 'ValidationError') error.message = 'Validation failed';
  if (err.message === 'error') error.message = 'Unexpected error';

  return error;
};

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
    const error = handleErrors(err);
    res.status(400).json({ error });
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
    const error = handleErrors(err);
    res.status(404).json(error);
  }
};
