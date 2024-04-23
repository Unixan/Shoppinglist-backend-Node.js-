const User = require('../model/User');

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json(err.message);
    console.log(err);
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(401).json(err.message);
    console.log(err);
  }
};
