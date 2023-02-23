const express = require("express");
const createError = require("http-errors");
const userRoute = require("./features/authorization/user.route");
const limitRoute = require("./features/limit-request/limit.route");
const orderRoute = require("./features/order/order.route");
const moneyTransactionRoute = require("./features/money-transaction/money-transaction.route");
const passportjsRoute = require("./features/passportjs/passportjs.route");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/limit", limitRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);
app.use("/money-transaction", moneyTransactionRoute);
app.use("/session", sessionRoute);
app.use("/passportjs", passportjsRoute);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
