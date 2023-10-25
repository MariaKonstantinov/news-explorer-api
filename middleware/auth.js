const jwt = require("jsonwebtoken");

// const { JWT_SECRET } = require("..."); TODO

const UnauthorizeError = require("../errors/UnauthorizeError");
const { ERROR_MESSAGE } = require("../utils/constants");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizeError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizeError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  req.user = payload; // payload assigned to request object

  return next();
};

module.exports = auth;
