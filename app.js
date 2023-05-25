require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { limiter } = require("./utils/config");
// const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes");
const error = require("./middlewares/error");

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);
// app.use(cors);

app.use(routes);

app.use(errorLogger);

mongoose.connect("mongodb://127.0.0.1:27017/bitfilmsdb");

app.use(errors());

app.use(error);

app.listen(PORT);
