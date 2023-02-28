const express = require("express");
const createError = require("http-errors");
const UserRoute = require("./features/routes/user.route");
const EcommerceRoute = require("./features/routes/ecommerce.route");
const { bootstrap } = require("./features/database/index");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", UserRoute);
app.use("/ecommerce", EcommerceRoute);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  bootstrap();
  console.log(`Server running on ${PORT}`);
});
