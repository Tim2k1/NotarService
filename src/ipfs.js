//using local Installation of IPFS waiting default on port 5001
//const ipfs = new window.Ipfs({host: 'localhost', port: 5001});

//ChatGPT würde es so machen:

/*
const IPFS = require('ipfs-http-client');
*/
// Create an IPFS instance pointing to your local node
const ipfs = IpfsApi.create({
  host: 'localhost',
  port: 8080,
  protocol: 'http',
});

export default ipfs;