const express = require("express");
const limitRequest = require("../../middlewares/limit_request");

const route = express.Router();

route.get("/", limitRequest, (req, res, next) => {
  const { _ttl, numRequest } = req;
  res.json({ message: "home page", _ttl, numRequest });
});

module.exports = route;
