const express = require("express");

function routes(Goal) {
  const goalRouter = express.Router();
  goalRouter
    .route("/goals")
    .post((req, res) => {
      const goal = new Goal(req.body);
      goal.save();
      return res.status(201).json(goal);
    })
    .get((req, res) => {
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
  goalRouter.use("/goals/:goalId", (req, res, next) => {
    Goal.findById(req.params.goalId, (err, goal) => {
      if (err) {
        return res.send(err);
      }
      if (goal) {
        req.goal = goal;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  goalRouter
    .route("/goals/:goalId")
    .get((req, res) => {
      res.json(req.goal);
    })
    .put((req, res) => {
      const { goal } = req;
      goal.name = req.body.name;
      goal.dates_done = req.body.dates_done;
      goal.type = req.body.type;
      goal.user_id = req.body.user_id;
      req.goal.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(goal);
      });
    })
    .patch((req, res) => {
      const { goal } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        goal[key] = value;
      });
      req.goal.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(goal);
      });
    });

  return goalRouter;
}

module.exports = routes;
