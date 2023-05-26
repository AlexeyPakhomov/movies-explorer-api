const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { NODE_ENV, JWT_SECRET } = process.env;
const { BadRequestError } = require("../errors/bad-request-err"); // 400
const { NotFoundError } = require("../errors/not-found-err"); // 404
const {
  ConflictingRequestError,
} = require("../errors/conflicting-request-err"); // 409
const {
  BAD_REQUEST_ERR,
  DUPLICATE_USER_ERR,
  NOT_FOUND_USER_ERR,
  NOT_FOUND_USER_ID_ERR,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(BAD_REQUEST_ERR));
      }
      if (err.code === 11000) {
        return next(new ConflictingRequestError(DUPLICATE_USER_ERR));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(next);
};

const getInfAboutUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND_USER_ERR));
      }
      return res.send(user);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(NOT_FOUND_USER_ID_ERR));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(BAD_REQUEST_ERR));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getInfAboutUser,
  updateProfile,
};
