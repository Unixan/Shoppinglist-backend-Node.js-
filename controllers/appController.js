const User = require('../model/User');
const ShoppingList = require('../model/ShoppingList');

const handleErrors = (err) => {
  if (err.message === 'userError') return 'User not found';
  if (err.name === 'ValidationError') return 'Validation failed';
  if (err.message === 'createError') return 'Unexpected error';
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
