const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/unauthorized-err'); // 401
const { EMAIL_ERR, AUTHORIZATION_DATA_ERR, NAME_ERR } = require('../utils/errors');
const { PATTERN_EMAIL, PATTERN_NAME } = require('../utils/constants');

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => PATTERN_EMAIL.test(v),
        message: EMAIL_ERR,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      validate: {
        validator: (v) => PATTERN_NAME.test(v),
        message: NAME_ERR,
      },
    },
  },
  {
    versionKey: false,
  },
);

schema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(AUTHORIZATION_DATA_ERR));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(AUTHORIZATION_DATA_ERR));
        }
        return user;
      });
    });
};

module.exports = model('user', schema);
