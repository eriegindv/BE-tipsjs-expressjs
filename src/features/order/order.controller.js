const { incrBy, setKey, getKey } = require("../../helpers/connections_redis");

const order = async (req, res) => {
  const time = new Date().getTime();

  // Gia su so luong ton kho hien tai la con 10
  const slTonKho = 10;

  // ten cua san pham la iPhone13
  const keyName = "iPhone13";

  // Gia su moi lan mua thi luong tieu thu hang ton kho la 1
  const slMua = 1;

  // So luong da ban ra, neu chua ban thi set = 0
  // con neu ban thi update +1 moi lan user order thanh cong
  await setKey(keyName, 0, { NX: true });

  // Lay so luong ban ra
  let slBanRa = await getKey(keyName);
  // Neu slBan + slMua > slTonKho return failed
  slBanRa = await incrBy(keyName, slMua);
  if (slBanRa > slTonKho) {
    return res.json({
      status: "error",
      message: "Het hang",
      time,
    });
  }

  // Neu user order thanh cong
  console.log(`Sau khi user order thanh cong thi so luong ban ra =`, slBanRa);
  if (slBanRa > slTonKho) {
    await setKey("banquaroi", slBanRa - slTonKho);
  }

  res.json({ status: "success", message: "OK", time });
};

const cancelExpiration = async (req, res) => {
  try {
    const { userId, order } = req.body;

    await setKey(order.id, "Cancel order", { EX: 3 });

    res.json({ status: "success", message: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { order, cancelExpiration };
