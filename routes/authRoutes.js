const { Router } = require('express');
const { login_post, signup_post } = require('../controllers/authController');

const router = Router();

router.post('/login', login_post);

router.post('/signup', signup_post);

module.exports = router;
