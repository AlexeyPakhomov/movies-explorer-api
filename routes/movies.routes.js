const router = require('express').Router();
const {
  getMyMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  joiCreateMovie,
  joiDeleteMovie,
} = require('../middlewares/joiValidation');

router.get('/', getMyMovies);
router.post('/', joiCreateMovie, createMovie);
router.delete('/:movieId', joiDeleteMovie, deleteMovie);

module.exports = router;