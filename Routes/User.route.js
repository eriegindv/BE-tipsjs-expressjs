const express = require("express");
const User = require("../Models/User.model");
const createError = require("http-errors");
const { userValidate } = require("../helpers/validation");

const route = express.Router();

route.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidate(req.body);
    console.log(`:::::error validation::`, error);
    if (error) {
      throw createError(error.details[0].message);
    }

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw createError.Conflict(`${email} is already been registered`);
    }

    const user = new User({
      email,
      password,
    });

    const savedUser = await user.save();

    return res.json({ status: "okay", elements: savedUser });
  } catch (error) {
    next(error);
  }
});

route.post("/refresh-token", (req, res, next) => {
  res.send("function refresh-token");
});

route.post("/login", async (req, res, next) => {
  try {
    const { error } = userValidate(req.body);
    if (error) throw createError(error.details[0].message);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createError.NotFound("User not registered");

    const isValid = await user.isCheckPassword(password);
    if (!isValid) throw createError.Unauthorized();

    res.send(user);
  } catch (error) {
    next(error);
  }
});

route.post("/logout", (req, res, next) => {
  res.send("function logout");
});

module.exports = route;
