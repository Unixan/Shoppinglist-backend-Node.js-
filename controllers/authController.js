const User = require('../model/User');

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.code === 11000) errors.email = 'Email unavailable';

  if (err.message === 'emailError') errors.email = "User doesn't exist";

  if (err.message === 'passwordError') errors.password = 'Wrong password';

  return errors;
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    res.status(201).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
