require("dotenv").config();

const express = require("express");

const { default: mongoose } = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

// http://localhost:3001/

mongoose.connect(
  "mongodb://127.0.0.1:27017/news_explorer",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");

app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
