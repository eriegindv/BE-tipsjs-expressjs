const express = require("express");
const { getSession, setSession } = require("./session.controller");

const route = express.Router();

route.get("/get", getSession);
route.get("/set", setSession);

module.exports = route;
