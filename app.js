require("dotenv").config();

const express = require("express");

const { default: mongoose } = require("mongoose");
const helmet = require("helmet");

const app = express();
const { PORT = 3001 } = process.env;
const cors = require("cors");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./utils/limiter");

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
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
