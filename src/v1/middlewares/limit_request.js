const { expire, incr, ttl } = require("../helpers/connections_redis");

const limitRequest = async (req, res, next) => {
  try {
    // get ip
    const getIPUser = "128.0.0.1";
    //req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const numRequest = await incr(getIPUser);

    let _ttl;
    if (numRequest === 1) {
      await expire(getIPUser, 60);
      _ttl = 60;
    } else {
      _ttl = await ttl(getIPUser);
    }

    req._ttl = _ttl;
    req.numRequest = numRequest;

    if (numRequest > 20) {
      res
        .status(503)
        .json({ status: "error", _ttl, message: "Server is busy" });
    } else {
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = limitRequest;
