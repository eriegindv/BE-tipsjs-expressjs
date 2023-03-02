const md5 = require("md5");

module.exports = {
  genSign: (params, keyToken) => {
    const sortKeys = [];
    params.keyToken = keyToken;
    params.v = "v1"; // version

    for (const key in params) {
      if (key !== "sign") {
        sortKeys.push(key); // club
      }
    }

    sortKeys.sort();
    let paramsHolder = "";
    sortKeys.forEach((key) => {
      paramsHolder += key + params[key]; // clubmanu
    });

    return md5(paramsHolder).toString();
  },
};
