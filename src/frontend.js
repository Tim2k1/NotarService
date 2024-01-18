// Simples Beispiel für die Verwendung von JavaScript und einer Mock-Blockchain-Instanz
import Ipfs from "./ipfs";
import {address,abi} from "./notarstore";

const web3 = new Web3(`https://sepolia.infura.io/v3/cd2a9cab98804fa6bda949e3db5b7005`);
const contract = new web3.eth.contract(abi,address);

const blockchain = {
    documents: [],
};

async function uploadDocument() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    try{
        const result = await Ipfs.add(file);
        const ipfsHash = result.cid.toString();

        console.log(`File added to IPFS with hash`, ipfsHash.toString());

        contract.methods.store(ipfsHash).send();
    } catch (error) {
        console.error('Error adding file to IPFS:', error);
    }

    // Simuliere das Generieren des Hashes
    const hash = generateHash(file.name + file.size + Date.now());

    // Füge das Dokument zur Blockchain hinzu
    blockchain.documents.push({
        name: file.name,
        hash: hash,
        timestamp: new Date().toLocaleString(),
    });

    // Zeige den generierten Hash in einem Popup an
    showHashPopup(hash);

    // Aktualisiere die Übersicht der Dokumente
    updateDocumentList();
}

function updateDocumentList() {
    const documentList = document.getElementById('documentList');
    documentList.innerHTML = '<h2>Übersicht der Dokumente</h2>';

    blockchain.documents.forEach((document) => {
        const listItem = document.createElement('p');
        listItem.textContent = `Dokument: ${document.name}, Hash: ${document.hash}, Zeitstempel: ${document.timestamp}`;
        documentList.appendChild(listItem);
    });
}

function showHashPopup(hash) {
    const hashPopup = document.getElementById('hashPopup');
    const hashValue = document.getElementById('hashValue');

    hashValue.textContent = hash;
    hashPopup.style.display = 'block';
}

function closePopup() {
    const hashPopup = document.getElementById('hashPopup');
    hashPopup.style.display = 'none';
}

function findDocumentByHash(){
    //TODO mit getDocumentbyHash aus Backend
}


