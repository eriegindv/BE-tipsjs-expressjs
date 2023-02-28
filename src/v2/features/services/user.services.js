const _User = require("../models/user.model");

// Utils
module.exports = {
  registerUser: async ({ email }) => {
    const user = await _User.findOne({ email });

    if (user) return { code: 400, message: "This email is already in user" };

    // dùng otp-generator
    const num = Math.floor(Math.random() * (999_999 - 100_000) + 100_000);
    const otp = num.toString();

    return { code: 200, otp, elements: 1 };
  },
  getStatics: async () => {
    return _User.getStatics();
  },
  getMethods: async () => {
    const __User = new _User();
    return __User.getMethods();
  },
};
