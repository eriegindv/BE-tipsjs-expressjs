const express = require("express");
const passport = require("passport");
const { getStatus, getProfile, login } = require("./passportjs.controller");

const route = express.Router();

route.get("/status", getStatus);
route.get("/profile", getProfile);
route.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  login
);

module.exports = route;
