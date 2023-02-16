const express = require("express");
const { verifyAccessToken } = require("../helpers/jwt_service");
const {
  register,
  refreshToken,
  login,
  logout,
  getLists,
} = require("./user.controller");

const route = express.Router();

route.post("/register", register);

route.post("/refresh-token", refreshToken);

route.post("/login", login);

route.delete("/logout", logout);

route.get("/getlists", verifyAccessToken, getLists);

module.exports = route;
