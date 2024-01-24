// Simples Beispiel für die Verwendung von JavaScript und einer Mock-Blockchain-Instanz
//import Ipfs from "./ipfs";
//import {address,abi} from "./notarstore";

//web3 connection/Instance mit Infura, einfach Infura URL hinzufügen, alternativ mit Metamask verbinden
//const web3 = new Web3(`https://sepolia.infura.io/v3/cd2a9cab98804fa6bda949e3db5b7005`);

//web3 mit Metamask

const web3 = new Web3(window.ethereum);
const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

//Verbindung zu unserem Smart Contract mit der erstellten web3 Instanz
const contract = new web3.eth.Contract(abi,address);

//using local Installation of IPFS waiting default on port 5001
const ipfs = await Ipfs.create({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
});

await ipfs.add("C:\Users\crate\OneDrive\Dokumente\IPFS_Test.txt");

/*
const blockchain = {
    documents: [],
};
 */

//Ausgewähltes Dokument auf die Blockchain und in das IPFS laden
async function uploadDocument() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    try{

        const result = await ipfs.add(file);
        const ipfsHash = result.cid.toString();

        console.log(`File added to IPFS with hash`, ipfsHash.toString());

        //Füge den generierten CID für das Dokument der Blockchain hinzu
        contract.methods.store(ipfsHash).send({ from: accounts[0] });

        // Zeige den generierten Hash in einem Popup an
        showHashPopup(ipfsHash);

        // Aktualisiere die Übersicht der Dokumente
        updateDocumentList();

    } catch (error) {
        console.error('Error adding file to IPFS:', error);
    }
    /*
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
     */
}

function updateDocumentList() {
    const documentList = document.getElementById('documentList');
    documentList.innerHTML = '<h2>Übersicht der Dokumente</h2>';

    //Methode aus Smart Contract returned alle Dokumente/CIDs die auf der Blockchain liegen
    contract.methods.getDocuments().call()
        .then(result => {
            //Speichert das empfangene Array mit Dokumenten aus dem Backend zwischen
            const documentArray = result;

            //Erstelle für alle Dokumente eine Ansicht auf der Übersichtsliste
            documentArray.forEach((document) => {
                const listItem = document.createElement('p');
                listItem.textContent = `Dokument: ${document.name}, Hash: ${document.ipfsHash}, Zeitstempel: ${document.storeDate}`;
                documentList.appendChild(listItem);
            });
        })

    /*
    blockchain.documents.forEach((document) => {
        const listItem = document.createElement('p');
        listItem.textContent = `Dokument: ${document.name}, Hash: ${document.hash}, Zeitstempel: ${document.timestamp}`;
        documentList.appendChild(listItem);
    });
    */

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
    const ipfsHash = document.getElementById('hashInput');

    //Methode aus Smart Contract, die mithilfe des eingegebenen Hash ein Dokument/CID returned
    contract.methods.getDocumentbyHash(ipfsHash).call()
        .then(result => {
            //Speichert das empfangene Array mit Dokumenten aus dem Backend zwischen
            const document = result;
            //TODO Dokument als Ergebnis anzeigen
        });
}

//TODO Löschen von Dokument

//TODO Download von Dokument


