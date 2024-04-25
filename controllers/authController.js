const User = require('../model/User');
const errorHandler = require('../middleware/errorHandler');

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    errorHandler(err, req, res);
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err.message);
    errorHandler(err, req, res);
  }
};

module.exports.deleteUser = async (req, res) => {
  const userToFind = req.params.id;
  try {
    const respsonse = await User.deleteUser(userToFind);
    res.status(200).json(respsonse);
    console.log(userToFind);
  } catch (err) {
    errorHandler(err, req, res);
    console.log(err.message);
  }
};
