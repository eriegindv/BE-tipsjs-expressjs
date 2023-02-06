const mongoose = require("mongoose");
const { testConnection } = require("../helpers/connections_multi_mongodb");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
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

UserSchema.pre("save", async function (next) {
  try {
    console.log(`Called before save::::`, this.email, this.password);
    const hashPassword = await bcrypt.hash(this.password, 10);

    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = testConnection.model("user", UserSchema);
