const { Schema, model } = require("mongoose");
const { regexUrl } = require("../utils/constants");

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
        message: "Некорректная ссылка",
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regexUrl.test(v),
        message: "Некорректная ссылка",
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => regexUrl.test(v),
        message: "Некорректная ссылка",
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
