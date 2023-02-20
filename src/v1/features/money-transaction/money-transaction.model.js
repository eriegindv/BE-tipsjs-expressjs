const mongoose = require("mongoose");
const { testConnection } = require("../../helpers/connections_multi_mongodb");

const Schema = mongoose.Schema;

const MoneySchema = new Schema(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = testConnection.model("MoneyTransaction", MoneySchema);
