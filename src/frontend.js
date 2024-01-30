//Web3 Verbindung mit Metamask Erweiterung im Browser
const web3 = new Web3(window.ethereum);
const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

//Verbindung zu unserem Smart Contract mit der erstellten Web3 Instanz
const contract = new web3.eth.Contract(abi,address);

//Lokale IPFS Installation verwenden
const ipfs = window.KuboRpcClient.create({ host: 'localhost', port: 5001 })

// Connection checker für unsere Web3 Verbindung
web3.eth.net.isListening()
    .then(isConnected => {
        if (isConnected) {
            console.log('Connected to Ethereum node');
        } else {
            console.error('Not connected to Ethereum node');
        }
    })
    .catch(error => {
        console.error('Error checking connection:', error);
    });

/*
const blockchain = {
    documents: [],
};
 */

document.getElementById("uploadButton").addEventListener("click", uploadDocument);

//Ausgewähltes Dokument auf die Blockchain und in das IPFS laden
async function uploadDocument() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    try{

        const result = await ipfs.add(file);
        const ipfsHash = result.cid.toString();

        console.log(`File added to IPFS with hash`, ipfsHash);

        //Füge den generierten CID für das Dokument der Blockchain hinzu
        contract.methods.Store(file.name,ipfsHash,accounts[0]).send({ from: accounts[0] });

        // Zeige den generierten Hash in einem Popup an
        //showHashPopup(ipfsHash);

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
            documentArray.forEach((doc) => {
                if (doc.owner = accounts[0]) {
                    const listItem = document.createElement('p');
                    // Timestamp Konvertierung zu verständlichem Datum
                    const timeStamp = Number(doc.storeDate);
                    const date = new Date(timeStamp * 1000);
                    const readableDate = date.toLocaleString();
                    listItem.className = 'doc';
                    listItem.textContent = `Dokument: ${doc.docName}, Hash: ${doc.ipfsHash}, Zeitstempel: ${readableDate}`;
                    documentList.appendChild(listItem);
                }
            });
        })
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
document.getElementById("findDocButton").addEventListener("click", findDocumentByHash);

function findDocumentByHash(){
    const ipfsHash = document.getElementById('hashInput').toString();

    //Methode aus Smart Contract, die mithilfe des eingegebenen Hash ein Dokument/CID returned
    contract.methods.getDocumentbyHash(ipfsHash).call()
        .then(result => {
            //Speichert das empfangene Array mit Dokumenten aus dem Backend zwischen und erstellt Ansicht für Dokument
            const doc = result;
            const documentContent = document.getElementById("documentContent");
            const listItem = document.createElement('p');
            const timeStamp = Number(doc.storeDate);
            const date = new Date(timeStamp * 1000);
            const readableDate = date.toLocaleString();
            listItem.className = 'doc';
            listItem.textContent = `Dokument: ${doc.docName}, Hash: ${doc.ipfsHash}, Zeitstempel: ${readableDate}`;
            documentContent.appendChild(listItem);
        });
}

async function deleteDocument(hash){
    try {
        // File mit CID löschen
        await ipfs.files.rm(`/${hash}`);
        await ipfs.pin.rm(`/${hash}`);

        console.log('File deleted from IPFS successfully.');

        //Starte Garbage Collector
        await ipfs.repo.gc();

    } catch (error) {
        console.error('Error deleting file from IPFS:', error);
    }
}
// Funktion zum generieren eines Uint8Arrays von einem AsyncIterable
async function concatenateAsyncIterable(asyncIterable) {
    let result = new Uint8Array();

    // Iterate over the AsyncIterable
    for await (const uint8Array of asyncIterable) {
        // Concatenate Uint8Arrays
        result = new Uint8Array([...result, ...uint8Array]);
    }

    return result;
}

//File Content von Ipfs
async function getDocumentContentFromIPFS(hash) {
    try {
        // File von IPFS holen mit CID
        const content = await ipfs.cat(`/${hash}`);

        const asyncIterable = content;

        const concatenatedUint8Array = await concatenateAsyncIterable(asyncIterable);

        // Convert Uint8Array to string for demonstration
        const resultString = new TextDecoder().decode(concatenatedUint8Array);

        return resultString;
    } catch (error) {
        console.error('Error getting document from IPFS:', error);
    }
}

async function downloadFile(hash) {
    //Methode aus Smart Contract, die mithilfe des eingegebenen Hash ein Dokument/CID returned
    contract.methods.getDocumentbyHash(hash).call()
        .then(async result => {
            //Speichert das empfangene Array mit Dokumenten aus dem Backend zwischen und erstellt Ansicht für Dokument
            const doc = result;

            const fileName = doc.docName;
            const fileContent = await getDocumentContentFromIPFS(hash);

            //Blob für Dokument Inhalt
            const blob = new Blob([fileContent]);

            // Downloadlink für Dokument
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;

            // Link auf der Seite generieren, klicken und wieder löschen
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
}
