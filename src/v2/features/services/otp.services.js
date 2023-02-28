module.exports = {
  validateOtp: async () => {
    // bcrypt compare
  },
  insertOtp: async ({ otp, email }) => {
    try {
      // dùng otp-generator
      // tương tự password, dùng bcrypt để mã hóa
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
