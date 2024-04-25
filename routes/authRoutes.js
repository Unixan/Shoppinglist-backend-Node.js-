const { Router } = require('express');
const {
  login_post,
  signup_post,
  deleteUser,
} = require('../controllers/authController');
const User = require('../model/User');
const errorHandler = require('../middleware/errorHandler');

const router = Router();

router.post('/login', login_post);

router.post('/signup', signup_post);

router.delete('/users/:id', deleteUser);

module.exports = router;
