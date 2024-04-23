const User = require('../model/User');
const ShoppingList = require('../model/ShoppingList');

module.exports.newShoppingList_post = async (req, res) => {
  const { name, isPrivate, user } = req.body;
  if (isPrivate) {
    try {
      const result = await User.addShoppingList(user, name);
      res.status(201).json(result);
    } catch (err) {
      res.status(401).json({ error: 'User not found' });
      console.log(err.message);
    }
  } else {
    try {
      const result = await ShoppingList.addShoppingList(user, name);
      res.status(201).json(result);
    } catch (err) {
      res.status(401).json(err.message);
      console.log(err.message);
    }
  }
};
