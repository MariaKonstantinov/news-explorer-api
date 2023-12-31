const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');
const { ERROR_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-dev-secret'
    );
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  req.user = payload; // payload assigned to request object

  return next();
};

module.exports = auth;
