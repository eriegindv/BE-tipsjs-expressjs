const express = require("express");
// const { getSession, setSession } = require("./session.controller");

const route = express.Router();

route.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = route;
