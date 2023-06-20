const BAD_REQUEST_ERR = 'Переданы некорректные данные';
const NOT_FOUND_MOVIE_ERR = 'Фильм с указанным _id не найден';
const FORBIDDEN_DELETE_MOVIE_ERR = 'Вы не можете удалять фильмы других пользователей';
const NOT_FOUND_MOVIE_ID_ERR = 'Удаление фильма с некорректным id';
const DUPLICATE_USER_ERR = 'Такой пользователь уже существует';
const NOT_FOUND_USER_ERR = 'Информация о пользователе отсутствует';
const NOT_FOUND_USER_ID_ERR = 'Пользователь с указанным _id не найден';
const AUTHORIZATION_REQUIRED_ERR = 'Необходима авторизация';
const SERVER_ERR = 'На сервере произошла ошибка';
const RATE_LIMIT_ERR = 'Превышено допустимое количество запросов. Попробуйте повторить запрос позднее';
const URL_ERR = 'Некорректная ссылка';
const EMAIL_ERR = 'Неправильный формат почты';
const AUTHORIZATION_DATA_ERR = 'Неправильная почта или пароль';
const PAGE_NOT_FOUND = 'Страница не найдена';

module.exports = {
  BAD_REQUEST_ERR,
  NOT_FOUND_MOVIE_ERR,
  FORBIDDEN_DELETE_MOVIE_ERR,
  NOT_FOUND_MOVIE_ID_ERR,
  DUPLICATE_USER_ERR,
  NOT_FOUND_USER_ERR,
  NOT_FOUND_USER_ID_ERR,
  AUTHORIZATION_REQUIRED_ERR,
  SERVER_ERR,
  RATE_LIMIT_ERR,
  URL_ERR,
  EMAIL_ERR,
  AUTHORIZATION_DATA_ERR,
  PAGE_NOT_FOUND,
};
