const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    email: String,
    username: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Statics vs Methods vs Virtual vs Middleware
UserSchema.statics.getStatics = () => {
  return "get Statics";
};

UserSchema.methods.getMethods = () => {
  return "get Methods";
};

module.exports = mongoose.model("User", UserSchema);
