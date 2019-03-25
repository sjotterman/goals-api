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
  goalRouter.route("/goals/:goalId").get((req, res) => {
    Goal.findById(req.params.goalId, (err, goal) => {
      if (err) {
        return res.send(err);
      }
      return res.json(goal);
    });
  });

  return goalRouter;
}

module.exports = routes;
