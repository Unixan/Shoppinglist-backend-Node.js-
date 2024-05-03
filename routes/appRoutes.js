const { Router } = require('express');
const { ShoppingList } = require('../model/ShoppingList');
const { Product } = require('../model/Product');
const User = require('../model/User');
const errorHandler = require('../middleware/errorHandler');
const {
  newShoppingList_post,
  removeShoppingList_delete,
  addItemToList_put,
} = require('../controllers/appController');

const router = Router();

router.post('/shoppinglist', newShoppingList_post);

router.delete('/shoppinglist', removeShoppingList_delete);

router.put('/shoppinglist', addItemToList_put);

router.patch('/shoppinglist', async (req, res) => {
  res.status(200).json('patch request made');
});

module.exports = router;
