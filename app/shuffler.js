const aesjs = require('aes-js');
const hex2bytes = aesjs.utils.hex.toBytes;

const key = hex2bytes('069d81b36ffa0ade3cc1e43d04ca83d3');
const iv = hex2bytes('46b41da8a79d4a4e4c90fdbdf7405ae0');

/**
 * @param {Uint8Array}
 * @return {Uint8Array}
 */
exports.encrypt = function(data) {
  var cfb = new aesjs.ModeOfOperation.cfb(key, iv, 16);
  return cfb.encrypt(data);
};

/**
 * @param {Uint8Array}
 * @return {Uint8Array}
 */
exports.decrypt = function(data) {
  var cfb = new aesjs.ModeOfOperation.cfb(key, iv, 16);
  return cfb.decrypt(data);
};
