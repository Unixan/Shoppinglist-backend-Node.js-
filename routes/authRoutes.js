const { Router } = require('express');
const User = require('../model/User');

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json(err.message);
    console.log(err);
  }
  // res.status(200).json({ status: 'login' });
});

router.post('/signup', async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
