const User = require('../model/User');
const errorHandler = require('../middleware/errorHandler');
const bcrypt = require('bcrypt');

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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      userName,
      password: hashedPassword,
    });
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
