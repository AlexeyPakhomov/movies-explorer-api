const { Schema, model } = require("mongoose");
const { regexUrl } = require("../utils/constants");
const { URL_ERR } = require("../utils/errors");

const schema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regexUrl.test(v),
        message: URL_ERR,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regexUrl.test(v),
        message: URL_ERR,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regexUrl.test(v),
        message: URL_ERR,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("movie", schema);
