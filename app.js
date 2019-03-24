const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const dbConnString =
  process.env.DB_CONN_STRING || "mongodb://localhost/goalsAPI-dev";
const db = mongoose.connect(dbConnString);
const goalRouter = express.Router();
const port = process.env.PORT || 4000;
const Goal = require("./models/goalModel");

app.use(cors());
goalRouter.route("/goals").get((req, res) => {
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
goalRouter.route("/goals/:goalId").get((req, res) => {
  Goal.findById(req.params.goalId, (err, goal) => {
    if (err) {
      return res.send(err);
    }
    return res.json(goal);
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
