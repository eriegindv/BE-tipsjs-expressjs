const express = require("express");
const createError = require("http-errors");
const UserRoute = require("./Routes/User.route");
const LimitRoute = require("./Routes/Limit.route");
const OrderRoute = require("./Routes/Order.route");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/limit", LimitRoute);
app.use("/order", OrderRoute);
app.use("/user", UserRoute);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
