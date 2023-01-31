const mongoose = require("mongoose");
const schema = new mongoose.Schema();

const UserSchema = new schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
