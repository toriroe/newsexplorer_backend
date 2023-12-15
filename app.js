const express = require("express");

const { default: mongoose } = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

mongoose.connect(
  "mongodb://127.0.0.1:27017/news_explorer",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);
