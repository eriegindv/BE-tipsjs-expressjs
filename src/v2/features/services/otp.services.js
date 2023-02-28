const bcrypt = require("bcrypt");
const _Otp = require("../models/otp.model");

module.exports = {
  validateOtp: async ({ otp, hashOtp }) => {
    try {
      const isValid = await bcrypt.compare(otp, hashOtp);
      return isValid;
    } catch (error) {
      next(error);
    }
  },
  insertOtp: async ({ otp, email }) => {
    try {
      const hashOtp = await bcrypt.hash(otp, 10);
      const otp = await _Otp.create({ email, otp: hashOtp });

      return otp ? 1 : 0;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
