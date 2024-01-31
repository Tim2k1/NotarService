// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract NotarStore{

    string docName;
    string ipfsHash;
    address owner;
    uint256 storeDate;

    struct Document{
        string docName;
        string ipfsHash;
        address owner;
        uint256 storeDate;
    }

    Document[] public documents;

    event StoreDocument(
        string docName,
        string ipfsHash,
        address owner,
        uint256 storeDate
    );

    // Map documents to owner
    mapping (uint => address) internal documentOwner;
    // Map documents to hash
    mapping (uint => string) internal documentHash;

    //only the owner can modify
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    //function for storing the Document on the Blockchain
    function Store(string memory _documentName, string memory _documentHash, address _owner) public{

        uint _storeDate = block.timestamp;
        documents.push(Document(_documentName, _documentHash, _owner, _storeDate));
        uint id = documents.length - 1;
        documentOwner[id] = msg.sender;
        documentHash[id] = _documentHash;
        emit StoreDocument(_documentName, _documentHash, _owner, _storeDate);
    }

    //Method for returning the total Number of Documents
    function getCount() public onlyOwner view returns(uint) {
     return documents.length;
    }

    //Method for getting all Documents
    function getDocuments() public view returns (Document[] memory){
        Document[] memory documentArray = new Document[](documents.length);

        for (uint i = 0; i < documents.length; i++) {
            documentArray[i] = documents[i];
        }

        return documentArray;
    }


    // Method for returning a specific Document by a given Hash
    function getDocumentbyHash(string memory _documentHash) public view returns (Document memory){

        Document memory document;
        Document memory result;

        for (uint i = 0; i < documents.length; i++){
            document = documents[i];

            if(keccak256(abi.encodePacked(document.ipfsHash)) == keccak256(abi.encodePacked(_documentHash))){
                result = document;
            }
        }
        return result;
    }

}