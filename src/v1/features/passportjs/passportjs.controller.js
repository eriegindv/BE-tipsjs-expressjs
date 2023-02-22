const { passportjsBootstrap } = require("./passportjs.services");

const getStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "ok",
  });
};

const getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      status: "success",
      message: "profile",
    });
  }
  res.status(200).json({
    status: "failed",
    message: "missing",
  });
};

const login = (req, res) => {
  try {
    res.json({
      body: req.body,
    });
  } catch (error) {
    res.json({ error: error.stack });
  }
};

passportjsBootstrap();

module.exports = { getStatus, getProfile, login };
