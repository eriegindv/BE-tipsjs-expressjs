const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const replayAttackRoute = require("./replay-attack.route");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/replay-attack", replayAttackRoute);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
