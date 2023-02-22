const express = require("express");
const app = express();
const passportjsRoute = require("./passportjs.route");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

const { PORT, KEY_SESSION } = process.env;
const store = session.MemoryStore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: KEY_SESSION,
    cookie: {
      maxAge: 1000 * 10, // 10s
    },
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/passportjs", passportjsRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
