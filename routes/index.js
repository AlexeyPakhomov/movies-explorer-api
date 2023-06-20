const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { joiSignUp, joiSignIn } = require('../middlewares/joiValidation');
const usersRoutes = require('./users.routes');
const moviesRoutes = require('./movies.routes');
const { NotFoundError } = require('../errors/not-found-err');
const { PAGE_NOT_FOUND } = require('../utils/errors');

router.post('/signup', joiSignUp, createUser);
router.post('/signin', joiSignIn, login);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
