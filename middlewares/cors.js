// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  "https://pakhomov.nomoredomains.rocks",
  "http://pakhomov.nomoredomains.rocks",
  "https://api.pakhomov.nomoredomains.rocks",
  "http://api.pakhomov.nomoredomains.rocks",
  "localhost:3000",
  "http://localhost:3000",
  "https://localhost:3000",
  "https://pakhomov.site",
  "http://pakhomov.site",
  "https://movies.pakhomov.site",
  "http://movies.pakhomov.site",
  "https://api.movies.pakhomov.site",
  "http://api.movies.pakhomov.site",
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const cors = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers["access-control-request-headers"];

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next(); // 'Return' борется с ESlint, чтобы не добавлять дополнительные исключения.
};

module.exports = { cors };
