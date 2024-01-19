const address = '0x4cc02532a492b0799fE3d92A5d150DE7C17f472F';

const abi =
	[
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_documentHash",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				}
			],
			"name": "Store",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "ipfsHash",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "storeDate",
					"type": "uint256"
				}
			],
			"name": "StoreDocument",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "documents",
			"outputs": [
				{
					"internalType": "string",
					"name": "ipfsHash",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "storeDate",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_documentHash",
					"type": "string"
				}
			],
			"name": "getDocumentbyHash",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "ipfsHash",
							"type": "string"
						},
						{
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "storeDate",
							"type": "uint256"
						}
					],
					"internalType": "struct NotarStore.Document",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_documentHash",
					"type": "string"
				}
			],
			"name": "getDocumentData",
			"outputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_storeDate",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getDocuments",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "ipfsHash",
							"type": "string"
						},
						{
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "storeDate",
							"type": "uint256"
						}
					],
					"internalType": "struct NotarStore.Document[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]


//export {abi, address};