const express = require("express");
const { order, cancelExpiration } = require("../Controllers/Order.controller");

const route = express.Router();

route.get("/", order);
route.post("/expiration-order", cancelExpiration);

module.exports = route;
