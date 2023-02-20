const mongoose = require("mongoose");
require("dotenv").config();

function newConnection(uri) {
  const conn = mongoose.createConnection(uri);

  conn.on("connected", function () {
    console.log(`Mongodb::: connected:::${this.name}`);
  });

  conn.on("disconnected", function () {
    console.log(`Mongodb::: disconnected:::${this.name}`);
  });

  conn.on("error", function (error) {
    console.log(`Mongodb::: error:::${JSON.stringify(error)}`);
  });

  return conn;
}

// make connection to DB test
const testConnection = newConnection(process.env.URI_MONGODB_TEST);
const userConnection = newConnection(process.env.URI_MONGODB_USERS);

module.exports = {
  testConnection,
  userConnection,
};
