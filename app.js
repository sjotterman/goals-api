const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const dbConnString =
  process.env.DB_CONN_STRING || "mongodb://localhost/goalsAPI-dev";
const db = mongoose.connect(dbConnString);
const port = process.env.PORT || 4000;
const Goal = require("./models/goalModel");
const goalRouter = require("./routes/goalRouter")(Goal);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api", goalRouter);
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Running on port ${port}`);
});
