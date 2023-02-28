const {
  getMethods,
  getStatics,
  registerUser,
} = require("../services/user.services");

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { code, otp, elements } = await registerUser({ email });
      res.status(code).json({ code, otp, elements });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getMethods: async (req, res, next) => {
    try {
      res.json({ message: await getMethods() });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getStatics: async (req, res, next) => {
    try {
      res.json({ message: await getStatics() });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
