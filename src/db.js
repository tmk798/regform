const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/registrationDB")
  .then(() => console.log(" MongoDB Connected"))
  .catch((error) => console.log(" MongoDB Connection Error:", error));

module.exports = mongoose;
