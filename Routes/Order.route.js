const express = require("express");
const { order } = require("../Controllers/Order.controller");

const route = express.Router();

route.get("/", order);

module.exports = route;
