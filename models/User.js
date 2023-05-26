const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/unauthorized-err'); // 401
const { EMAIL_ERR, AUTHORIZATION_DATA_ERR } = require('../utils/errors');

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
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
      default: 'Александр',
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
