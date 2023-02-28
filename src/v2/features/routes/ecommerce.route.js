const express = require("express");
const {
  addInventory,
  addProduct,
  addToCart,
} = require("../controllers/ecommerce.controller");

const route = express.Router();

route.put("/product", addProduct);
route.put("/inventory", addInventory);
route.put("/addToCart", addToCart);

module.exports = route;
