require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const error = require('./middlewares/error');
const { MONGO_DB, PORT } = require('./utils/config');

const app = express();
mongoose.connect(MONGO_DB);

app.use(cors);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
