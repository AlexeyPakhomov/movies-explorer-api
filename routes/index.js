const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { joiSignUp, joiSignIn } = require('../middlewares/joiValidation');
const usersRoutes = require('./users.routes');
const moviesRoutes = require('./movies.routes');
const { NotFoundError } = require('../errors/not-found-err');

router.post('/signup', joiSignUp, createUser);
router.post('/signin', joiSignIn, login);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;