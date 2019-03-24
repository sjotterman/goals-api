const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connect("mongodb://localhost/goalsAPI-dev");
const goalRouter = express.Router();
const port = process.env.PORT || 4000;
const Goal = require("./models/goalModel");

app.use(cors());
goalRouter.route("/goals").get((req, res) => {
  //   const response = { hello: "This is a get response" };
  const query = {};
  if (req.query.type) {
    query.type = req.query.type;
  }
  Goal.find(query, (err, goals) => {
    if (err) {
      return res.send(err);
    }
    return res.json(goals);
  });
});
app.use("/api", goalRouter);
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Running on port ${port}`);
});
