const mongoose = require("mongoose");

let dbconfig = {
  getUrl() {
    return `mongodb+srv://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@mirrorassistant.bus1b.mongodb.net/${process.env["DB_NAME"]}?retryWrites=true&w=majority`;
  },
};
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbconfig.getUrl(), connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

module.exports = mongoose;
