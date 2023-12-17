require("dotenv").config();

const express = require("express");

const { default: mongoose } = require("mongoose");
const helmet = require("helmet");

const app = express();
const { PORT = 3001, NODE_ENV, DB_ADDRESS } = process.env;
const cors = require("cors");
const { errors } = require("celebrate");
const { DB_ADDRESS_DEV } = require("./utils/constants");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./utils/limiter");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

// http://localhost:3001/

if (NODE_ENV === "production") {
  mongoose.connect(
    DB_ADDRESS,
    (r) => {
      console.log("connected to DB", r);
    },
    (e) => console.log("DB error", e),
  );
} else {
  mongoose.connect(
    DB_ADDRESS_DEV,
    (r) => {
      console.log("connected to DB", r);
    },
    (e) => console.log("DB error", e),
  );
}

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
