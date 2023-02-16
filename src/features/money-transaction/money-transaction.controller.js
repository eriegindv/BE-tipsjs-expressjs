const Money = require("./money-transaction.model");
const mongoose = require("mongoose");
const { testConnection } = require("../../helpers/connections_multi_mongodb");

const createUser = async (req, res, next) => {
  try {
    const { userId, amount } = req.body;
    const rs = await Money.create({ userId, amount });
    res.json({
      data: rs,
    });
  } catch (error) {
    next(error);
  }
};

// chuyen tien A -> B
const transferMoney = async (req, res, next) => {
  const session = await testConnection.startSession();
  try {
    const { fromId, toId, amount } = req.body;

    // create transaction
    session.startTransaction();

    const amountFrom = await Money.findOneAndUpdate(
      { userId: fromId },
      { $inc: { amount: -amount } },
      { session, new: true }
    );
    console.log(`Account ${fromId} is ::::`, amountFrom);

    const amountTo = await Money.findOneAndUpdate(
      { userId: toId },
      { $inc: { amount } },
      { session, new: true }
    );
    console.log(`Account ${toId} is ::::`, amountTo);
    if (amountFrom.amount < 0) {
      throw new Error("Khong du tien");
    }

    // Nếu thành công thì commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.json({
      message: "Transfer is Okay",
    });
  } catch (error) {
    // Nếu xảy ra lỗi thì abort transaction
    await session.abortTransaction();
    session.endSession();

    next(error);
  }
};

module.exports = { createUser, transferMoney };
