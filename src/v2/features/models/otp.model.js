const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    create: { type: Date, defautl: Date.now(), index: { expires: 20 } },
  },
  {
    collection: "otps",
  }
);

module.exports = mongoose.model("Otp", OtpSchema);
