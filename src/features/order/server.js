const express = require("express");
const createError = require("http-errors");
const orderRoute = require("./order.route");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/order", orderRoute);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
