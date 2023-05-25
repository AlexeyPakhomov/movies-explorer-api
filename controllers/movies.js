const Movie = require("../models/Movie");
const { BadRequestError } = require("../errors/bad-request-err"); // 400
const { ForbiddenError } = require("../errors/forbidden-err"); // 403
const { NotFoundError } = require("../errors/not-found-err"); // 404

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
        return next(
          new BadRequestError(
            "Переданы некорректные данные при создании карточки."
          )
        );
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError("Фильм с указанным _id не найден."));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("Вы не можете удалять фильмы других пользователей")
        );
      }
      return Movie.findByIdAndRemove(req.params.movieId).then(() =>
        res.send(movie)
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Удаление фильма с некорректным id"));
      }
      return next(err);
    });
};

module.exports = {
  getMyMovies,
  createMovie,
  deleteMovie,
};
