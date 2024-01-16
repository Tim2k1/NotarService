/*import Web3 from 'web3';


//const Web3 = require('web3');


//connection for web3
const web3 = new Web3(new Web3.providers.HttpProvider);

export default web3;


    Ich weiß nicht genau ob es so funktioniert, hab den Code aus den Beispiel Repositories
    Falls es nicht funktioniert muss ich nochmal darüber schauen und vllt mal im Internet scaheuen
*/

const Web3 = require('web3');

// Connect to Ethereum node
const web3 = new Web3(`https://sepolia.infura.io/v3/cd2a9cab98804fa6bda949e3db5b7005`);

export default web3;


