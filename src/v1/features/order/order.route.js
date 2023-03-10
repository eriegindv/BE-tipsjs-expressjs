const express = require("express");
const { order, cancelExpiration } = require("./order.controller");

const route = express.Router();

route.get("/concurrence-order", order);
route.post("/expiration-order", cancelExpiration);

module.exports = route;
