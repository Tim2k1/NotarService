//File with Examples on how tu use methods from the backend and how to store Files in the IPFS

import web3 from './web3';
import ipfs from './ipfs';
import notarstore from './notarstore';


//accounts von User holen (hier für Browser Plugin Account)
const accounts = await web3.eth.getAccounts();

//Calling Method from notarstore contract
notarstore.methods.store(ipfsHash,accounts[0]).send({
          from: accounts[0] 
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); 

//adding a file on ipfs
async function addFileToIPFS(filePath) {
  try {
    
    //TODO read Document and 

    const result = await ipfs.add(fileContent);
    const ipfsHash = result.cid;

    console.log(`File added to IPFS with hash`, ipfsHash.toString());
  } catch (error) {
    console.error('Error adding file to IPFS:', error);
  }
}