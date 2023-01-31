const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res, next) => {
  res.send("home page");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
