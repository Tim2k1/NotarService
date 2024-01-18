//File with Examples on how tu use methods from the backend and how to store Files in the IPFS

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

// Function to read a file from IPFS
async function readFileFromIPFS(fileHash, outputPath) {
  try {
    // Get the file content from IPFS
    const chunks = [];
    for await (const chunk of ipfs.cat(fileHash)) {
      chunks.push(chunk);
    }

    // Concatenate the chunks to get the complete file content
    const fileContent = Buffer.concat(chunks);

    // Write the file content to the specified output path
    fs.writeFileSync(outputPath, fileContent);

    console.log(`File retrieved from IPFS and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error reading file from IPFS:', error.message);
  }
}

// Function to unpin a file from IPFS
async function unpinFileFromIPFS(cid) {
  try {
    // Unpin the file from IPFS
    await ipfs.pin.rm(cid);

    console.log(`File with CID ${cid} unpinned from IPFS`);
  } catch (error) {
    console.error('Error unpinning file from IPFS:', error.message);
  }
}