const express = require("express");
const { listData } = require("./replay-attack.controller");

const route = express.Router();

route.get("/", listData);

module.exports = route;
