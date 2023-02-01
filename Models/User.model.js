const mongoose = require("mongoose");
const { testConnection } = require("../helpers/connections_multi_mongodb");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
