const express = require("express");
const createError = require("http-errors");
const session = require("express-session");
const redis = require("redis");
const sessionRoute = require("./session.route");

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    // đặt lại session cookie cho mỗi request
    // giả sử cookie hết hạn sau 10 phút, nó sẽ tự động đặt lại cookie mới
    resave: false,
    // bất kể có cookie session hay không, cookie session được đánh dấu mỗi khi có request
    // cookie session là connect.sid
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 5 * 60 * 1000 },
  })
);

app.use("/session", sessionRoute);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use((err, req, res, next) => {
  res.json({ status: err.status || 500, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
