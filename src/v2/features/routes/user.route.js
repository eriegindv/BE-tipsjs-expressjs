const express = require("express");
const {
  getMethods,
  getStatics,
  registerUser,
} = require("../controllers/user.controller");

const route = express.Router();

route.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

route.get("/getMethods", getMethods);
route.get("/getStatics", getStatics);
route.post("/users", registerUser);

module.exports = route;
