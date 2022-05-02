const mongoose = require("./conexion-db");

var historySchema = mongoose.Schema({
  user: String,
  loginDate: String,
  extra: Number,
});

module.exports = mongoose.model("History", historySchema);
