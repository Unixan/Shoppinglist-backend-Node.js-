const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  console.log(err.name);
  let errorMessage = 'Internal Server Error';
  let statusCode = 500;

  if (err.message === 'userError' || err.message === 'emailError') {
    errorMessage = 'User not found';
    statusCode = 404;
  } else if (err.message === 'listError') {
    errorMessage = 'Shoppinglist not found';
    statusCode = 404;
  } else if (
    err.name === 'ValidationError' ||
    err.message === 'ValidationError'
  ) {
    errorMessage = 'Validation failed';
    statusCode = 400;
  } else if (err.code === 11000) {
    errorMessage = 'Email unavailable';
    statusCode = 409;
  } else if (err.message === 'passwordError') {
    errorMessage = 'Wrong password';
    statusCode = 401;
  }

  res.status(statusCode).json({ message: errorMessage });
};

module.exports = errorHandler;
