const getSession = async (req, res, next) => {
  res.send(req.session);
};

const setSession = async (req, res, next) => {
  req.session.user = {
    username: "Tips Javascript",
    age: 38,
    email: "anonystick@gmail.com",
  };
  res.send("set OK");
};

module.exports = { getSession, setSession };
