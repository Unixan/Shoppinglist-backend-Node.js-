const { Router } = require('express');
const ShoppingList = require('../model/ShoppingList');
const User = require('../model/User');
const {
  newShoppingList_post,
  removeShoppingList_delete,
} = require('../controllers/appController');

const router = Router();

router.post('/shoppinglist', newShoppingList_post);

router.delete('/shoppinglist', removeShoppingList_delete);

router.patch('/shoppinglist', (req, res) => {});

module.exports = router;
