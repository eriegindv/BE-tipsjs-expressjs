const mongoose = require("mongoose");

const bootstrap = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test")
    .then(() => console.log("Mongoose connected"));
};

module.exports = { bootstrap };
