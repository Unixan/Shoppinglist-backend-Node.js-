const User = require('../model/User');
const ShoppingList = require('../model/ShoppingList');

module.exports.newShoppingList_post = async (req, res) => {
  const { name, isPrivate, user } = req.body;
  if (isPrivate) {
    try {
      const foundUser = await User.findById(user);
      if (foundUser) {
        foundUser.shoppingLists.push({ name, isPrivate, users: [user] });
        foundUser.save();
        res.status(201).json({ response: 'list saved to user ', foundUser });
      }
    } catch (err) {
      res.status(401).json({ error: 'User not found' });
      console.log(err.message);
    }
  } else {
    try {
      const list = await ShoppingList.create({
        name,
        isPrivate,
        users: [user],
      });
      res.status(201).json({ list });
    } catch (err) {
      res.status(401).json(err.message);
      console.log(err.message);
    }
  }
};
