const passport = require("passport");
const LocalStrategy = require("passport-local");

// Database
const user = {
  username: "user",
  password: "123",
};

const passportjsBootstrap = () => {
  passport.use(
    new LocalStrategy((username, password, callback) => {
      // Get from DB
      if (username === user.username && password === user.password) {
        return callback(null, { username, password, active: true });
      }
      callback(null, false);
    })
  );

  passport.serializeUser((user, callback) => callback(null, user.username));

  passport.deserializeUser((username, callback) => {
    // check username
    if (username === user.username) {
      return callback(null, username);
    }
    callback(null, false);
  });
};

module.exports = { passportjsBootstrap };
