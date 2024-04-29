const { Router } = require('express');
const { ShoppingList } = require('../model/ShoppingList');
const { Product } = require('../model/Product');
const User = require('../model/User');
const {
  newShoppingList_post,
  removeShoppingList_delete,
} = require('../controllers/appController');
const errorHandler = require('../middleware/errorHandler');

const router = Router();

router.post('/shoppinglist', newShoppingList_post);

router.delete('/shoppinglist', removeShoppingList_delete);

router.patch('/shoppinglist', async (req, res) => {
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
});

module.exports = router;
