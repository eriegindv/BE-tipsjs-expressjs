const express = require("express");
const { createUser, transferMoney } = require("./money-transaction.controller");

const route = express.Router();

route.post("/user", createUser);
route.post("/transfer", transferMoney);

module.exports = route;
