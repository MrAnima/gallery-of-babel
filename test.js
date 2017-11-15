require('should');

const binary = require('./app/binary');

binary.toBytes([1,0,0,0,1,1,1,1])
  .should.be.eql(new Uint8Array([143]));

binary.toBits([143, 1])
  .should.be.eql(new Uint8Array([1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1]));

console.log('Tests finished !');
