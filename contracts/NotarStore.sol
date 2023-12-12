// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract NotarStore{

    string ipfsHash;
    address owner;
    uint256 storeDate;

    struct Document{
        string ipfsHash;
        address owner;
        uint256 storeDate;
    }

    Document[] public documents;

    event StoreDocument(
        string ipfsHash,
        address owner,
        uint256 storeDate
    );

    // Map documents to owner
    mapping (uint => address) internal documentOwner;
    // Map documents to hash
    mapping (uint => string) internal documentHash;
    // stored Hashes
    mapping(string => bool) Hashes;

    function Store(string memory _documentHash, address _owner) public{
        require(!Hashes[_documentHash], "File already stored");

        uint _storeDate = block.timestamp;
        documents.push(Document(_documentHash, _owner, _storeDate));
        uint id = documents.length - 1;
        documentOwner[id] = msg.sender;
        documentHash[id] = _documentHash;
        emit StoreDocument(_documentHash, _owner, _storeDate);
    }

    function getCount() public view returns(uint) {
     return documents.length;
    }

    function getDocuments() public view returns (Document[] memory){
        Document[] memory documentArray = new Document[](documents.length);

        for (uint i = 0; i < documents.length; i++) {
            documentArray[i] = documents[i];
        }

        return documentArray;
    }

    function getDocumentbyHash(string memory _documentHash) public view returns (Document memory){
        require(Hashes[_documentHash],"False Hash");

        Document memory document;
        Document memory result;

        for (uint i = 0; i < documents.length; i++){
            document = documents[i];

            if(keccak256(abi.encodePacked(document.ipfsHash)) == keccak256(abi.encodePacked(_documentHash))){
                result = document;
            }
        }
        return document;
    }

}