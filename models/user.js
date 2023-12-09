const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      // requirements for every user name field:
      type: String,
      required: [true, 'Enter your name please'],
      minlength: [2, 'Please lengthen this text to 2 characters or more'],
      maxlength: [30, 'Please lengthen this text to 30 characters or less'],
    },
    email: {
      // requirements for every user email field:
      type: String,
      required: [true, 'Sorry,Email is required'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Sorry, it is not a valid email',
      },
    },
    password: {
      // requirements for every user password field:
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
