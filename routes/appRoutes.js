const { Router } = require('express');
const ShoppingList = require('../model/ShoppingList');
const User = require('../model/User');
const { newShoppingList_post } = require('../controllers/appController');

const router = Router();

router.post('/shoppinglist', newShoppingList_post);

module.exports = router;
