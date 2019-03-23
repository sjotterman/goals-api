var express = require("express");

var app = express();

var port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello world.");
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
