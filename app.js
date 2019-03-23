const express = require("express");

const app = express();
const goalRouter = express.Router();
const port = process.env.PORT || 4000;

goalRouter.route("/goals").get((req, res) => {
  //   const response = { hello: "This is a get response" };
  const response = [
    {
      id: "brush-my-teeth",
      name: "Brush my teeth",
      dates_done: ["2019-03-01", "2019-03-02", "2019-03-23"]
    },
    {
      id: "sit-with-my-feelings",
      name: "Sit with my feelings",
      dates_done: ["2019-03-23"]
    }
  ];
  res.json(response);
});

app.use("/api", goalRouter);
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Running on port ${port}`);
});
