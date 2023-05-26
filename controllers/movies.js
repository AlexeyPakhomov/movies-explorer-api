const Movie = require("../models/Movie");
const { BadRequestError } = require("../errors/bad-request-err"); // 400
const { ForbiddenError } = require("../errors/forbidden-err"); // 403
const { NotFoundError } = require("../errors/not-found-err"); // 404
const {
  BAD_REQUEST_ERR,
  NOT_FOUND_MOVIE_ERR,
  FORBIDDEN_DELETE_MOVIE_ERR,
  NOT_FOUND_MOVIE_ID_ERR,
} = require("../utils/errors");

const getMyMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(BAD_REQUEST_ERR));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(NOT_FOUND_MOVIE_ERR));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(FORBIDDEN_DELETE_MOVIE_ERR));
      }
      return Movie.findByIdAndRemove(req.params.movieId).then(() =>
        res.send(movie)
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(NOT_FOUND_MOVIE_ID_ERR));
      }
      return next(err);
    });
};

module.exports = {
  getMyMovies,
  createMovie,
  deleteMovie,
};
