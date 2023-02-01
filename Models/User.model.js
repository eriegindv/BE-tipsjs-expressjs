const mongoose = require("mongoose");
const schema = new mongoose.Schema();

const { testConnection } = require("../helpers/connections_multi_mongodb");

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

module.exports = testConnection.model("user", UserSchema);
