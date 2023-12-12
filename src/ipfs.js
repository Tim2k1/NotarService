const IPFS = require('ipfs-api');

//using local Installation of infura waiting default on port 5001
const ipfs = new IPFS({host: 'localhost', port: 5001, protocol: 'http'});

export default ipfs;