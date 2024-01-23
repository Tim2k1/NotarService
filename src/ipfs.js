//using local Installation of IPFS waiting default on port 5001
const ipfs = async() => await Ipfs.create();

//ChatGPT würde es so machen:

/*
const IPFS = require('ipfs-http-client');

// Create an IPFS instance pointing to your local node
const ipfs = await window.Ipfs.create({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});
*/

//const ipfs = new window.Ipfs({host: 'localhost', port: 5001});

//export default ipfs;