const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');

const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadReqError = require('../errors/BadReqError');
const { ERROR_MESSAGE } = require('../utils/constants');

const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((data) => {
      const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      const { password, ...user } = data._doc;
      res.send({ data: user, token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

// POST
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(ERROR_MESSAGE.CONFLICT);
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((data) => {
      const { password, ...user } = data._doc;
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Invalid email or password'));
      } else {
        next(err);
      }
    });
};

// GET
const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports = {
  userLogin,
  createUser,
  getCurrentUser,
};
