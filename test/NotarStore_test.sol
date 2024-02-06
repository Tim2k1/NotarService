// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/NotarStore.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {

    NotarStore notarTest;

    function beforeAll() public {
        notarTest = new NotarStore();
    }

    // Test the Store function
    function testStore() public {
         // Parameters for the Store function
        string memory documentName = "Test";
        string memory documentHash = "Qmzhff23";
        address owner = address(this);

        // Call the Store function
        notarTest.Store(documentName, documentHash, owner);

        // Get the stored document details
        (string memory storedDocumentName, string memory storedDocumentHash, address storedOwner, uint storedDate) = notarTest.documents(0);

        // Check if the stored document details match the expected values
        Assert.equal(storedDocumentName, documentName, "Stored document name does not match");
        Assert.equal(storedDocumentHash, documentHash, "Stored document hash does not match");
        Assert.equal(storedOwner, owner, "Stored document owner does not match");
        Assert.equal(storedDate, block.timestamp, "Stored date does not match");
    }

    // Test the getDocuments function
    function testGetDocuments() public {
        // Add some documents
        notarTest.Store("Document1", "Hash1", address(this));
        notarTest.Store("Document2", "Hash2", address(this));
        notarTest.Store("Document3", "Hash3", address(this));

        // Call the getDocuments function
        NotarStore.Document[] memory documentArray = notarTest.getDocuments();

        // Check if the returned documentArray length is correct
        Assert.equal(documentArray.length, 4, "Returned documentArray length should be 4");

        // Check if the returned document details are correct
        Assert.equal(documentArray[1].docName, "Document1", "Document1 name does not match");
        Assert.equal(documentArray[2].docName, "Document2", "Document2 name does not match");
        Assert.equal(documentArray[3].docName, "Document3", "Document3 name does not match");
    }

    // Test the getDocumentbyHash function
    function testGetDocumentbyHash() public {

        // Call the getDocumentbyHash function
        string memory targetDocumentHash = "Hash2";
        NotarStore.Document memory foundDocument = notarTest.getDocumentbyHash(targetDocumentHash);

        // Check if the returned document details are correct
        Assert.equal(foundDocument.docName, "Document2", "Document name does not match");
        Assert.equal(foundDocument.ipfsHash, "Hash2", "Document hash does not match");
        Assert.equal(foundDocument.owner, address(this), "Document owner does not match");
    }

}
    
