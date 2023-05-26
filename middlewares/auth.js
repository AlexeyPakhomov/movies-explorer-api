const jwt = require("jsonwebtoken");
const { JWT } = require("../utils/config");
const { UnauthorizedError } = require("../errors/unauthorized-err"); // 401
const { AUTHORIZATION_REQUIRED_ERR } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED_ERR));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT); // пытаемся верифицировать токен
  } catch (err) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED_ERR));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // 'Return' борется с ESlint, чтобы не добавлять дополнительные исключения.
};

module.exports = { auth };
