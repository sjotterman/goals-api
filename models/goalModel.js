const mongoose = require("mongoose");

const { Schema } = mongoose;

const goalModel = new Schema({
  name: { type: String },
  type: { type: String },
  dates_done: [{ type: Date }],
  user_id: { type: Number }
});

module.exports = mongoose.model("Goal", goalModel);
