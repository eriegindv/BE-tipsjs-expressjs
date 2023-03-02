const { genSign } = require("../../helpers/generate_sign");

const TIME_REQUIREMENT = 30;
const signToken = "xxxxYYYY";
const data = [
  {
    name: "cr7",
    number: 7,
  },
  { name: "m10", number: 10 },
];

module.exports = {
  listData: async (req, res, next) => {
    try {
      const { stime, sign, nonce } = req.query;

      if (!stime || !sign || !nonce) {
        return res.status(400).json({
          status: "error",
          messaeg: "Bad Request!",
        });
      }

      // compare time
      const timeDifference = Math.floor((Date.now() - stime) / 1000);
      if (timeDifference > TIME_REQUIREMENT)
        return res.status(401).json({
          status: "error",
          messaeg: "Expired!",
        });

      if (genSign(req.query, signToken) !== sign)
        return res.status(401).json({
          status: "error",
          messaeg: "Sign invalid!",
        });

      return res.status(200).json({
        status: "success",
        elements: data,
      });
    } catch (error) {
      next(error);
    }
  },
};
