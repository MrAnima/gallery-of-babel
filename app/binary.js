/**
 * @param {Uint8Array} bits Bit array to turn into bytes
 * @return {Uint8Array} Byte array
 */
exports.toBytes = function(bits) {
  var output = new Uint8Array(Math.ceil(bits.length / 8));
  for (var i = 0; i < bits.length; i+=8) {
    var slice = bits.slice(i, i+8);
    var byte = 0;
    slice.forEach(bit => {
      byte = byte << 1;
      byte |= bit;
    });
    output[i / 8] = byte;
  }
  return output;
}

/**
 * @param {Uint8Array} bytes Byte array to break down
 * @return {Uint8Array} Bit array
 */
exports.toBits = function(bytes) {
  var output = new Uint8Array(bytes.length * 8);
  bytes.forEach((byte, index) => {
    for(var i = 0; i < 8; i++)
      output[8 * index + i] = ((byte << i) & 0b10000000) / 128;
  });
  return output;
}
