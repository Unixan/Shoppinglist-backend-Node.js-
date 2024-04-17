const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
  res.status(200).json({ status: 'login' });
});

router.post('/signup', (req, res) => {
  res.status(200).json({ status: 'signup' });
});

module.exports = router;
