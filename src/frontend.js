// Simples Beispiel für die Verwendung von JavaScript und einer Mock-Blockchain-Instanz
const blockchain = {
    documents: [],
};

function uploadDocument() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

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


