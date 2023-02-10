const express = require("express");
const createError = require("http-errors");
const UserRoute = require("./Routes/User.route");
const preventRequest = require("./middlewares/prevent_request");

require("dotenv").config();
// require("./helpers/connections_mongodb");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", preventRequest, (req, res, next) => {
  const { _ttl, numRequest } = req;
  res.json({ message: "home page", _ttl: req._ttl, numRequest });
});

app.use("/user", UserRoute);

app.use((req, res, next) => {
  // const error = new Error("Not Found");
  // error.status = 500;
  // next(error);
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
