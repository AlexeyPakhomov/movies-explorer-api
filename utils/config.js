const {
  NODE_ENV,
  JWT_SECRET,
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const JWT = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  MONGO_DB,
  PORT,
  JWT,
};
