const router = require('express').Router();
const {
  getInfAboutUser,
  updateProfile,
} = require('../controllers/users');
const {
  joiUpdateProfile,
} = require('../middlewares/joiValidation');

router.get('/me', getInfAboutUser);
router.patch('/me', joiUpdateProfile, updateProfile);

module.exports = router;
