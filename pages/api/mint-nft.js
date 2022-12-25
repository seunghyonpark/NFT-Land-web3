//import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
import { consoleLog } from "mocha/lib/reporters/base";
//import { calculateOverrideValues } from "next/dist/server/font-utils";


import contractABI from "../../constants/contractABI.json";


// ----------------------------
/*
const alchemy = new Alchemy({
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
});
*/

//const chainId = "8217"; // cypress
const chainId = "1001"; // baobab
const accessKeyId = "KASK7LN9R0ADR0L3SP4GVN79";
const secretAccessKey = "pam2QVYUTV1iqL77sxBbTSKsBHc2ZPw6mFUHScFm";
// Set an authorization through 'caver.initKASAPI' function
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

//caver.initKIP17API(chainId, accessKeyId, secretAccessKey);


//const contractAddress = '0xf57255329ad3f60b19cb452b68546e11f1fe20df'; // cypress contract
const contractAddress = '0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b'; // baobab contract


/*
export default async function handler(req, res) {
	try {
		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}
		const { wallet } = req.query;
		const results = await alchemy.nft.getNftsForOwner(wallet);
		res.json({ message: "Fetch successful!", data: results });

		const blockNumber = await caver.rpc.klay.getBlockNumber();
		console.log(blockNumber);


	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}
*/



export default async function handler(req, res) {

	try {
		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}

		const { wallet } = req.query;

		console.log("wallet",wallet);






		//-------- mint -------------------

		//const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, nftQuery);

		/*
		개인키(private key)를 사용하여 키링(keyring)을 만들고 그 키링을 caver.wallet에 추가합니다. 이렇게 추가한 키링은 나중에 계약을 발행할 때 사용됩니다.
		
		// Add a keyring to caver.wallet
		const privateKey = fs.readFileSync(".secret").toString().trim();
		const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
		caver.wallet.add(deployer);
		const abi = Artifact.compilerOutput.abi;
		const data = Artifact.compilerOutput.evm.bytecode.object;
		const contract = caver.contract.create(abi);
		const deployed = await contract.deploy({from: deployer.address, gas}, data)

		const deployed = caver.contract.create(abi, contractAddress)
		const receipt = await deployed.send({from: deployer.address, gas},
      'mintWithTokenURI', toAddress, 1, `${baseURI}/1`)
		*/

		


		const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;

		const keyring = caver.wallet.keyring.createFromPrivateKey(ownerPrivateKey);
		const address = keyring.address;
		const key = keyring.key.privateKey;

		const ret = await caver.kas.wallet.migrateAccounts([{ address, key }]);


		const ownerPublicKey = address;

		
		const gas = 150000000;

		const baseURI = 'https://gogodino.saltmarble.io/metaexplorers/json';

		const deployed = caver.contract.create(contractABI, contractAddress);



		const totalSupply = await caver.kas.wallet.callContract(contractAddress, 'totalSupply');

		console.log("totalSupply", totalSupply);

		const tokenId = parseInt(caver.utils.toBN(totalSupply.result)) + 128;



		const receipt = await deployed.send(
			{from: ownerPublicKey, gas},
			'mintWithTokenURI',
			wallet,
			tokenId,
			`${baseURI}/${tokenId}.json`
		);

		console.log("receipt", receipt);


		console.log("senderTxHash", receipt.senderTxHash);

		

		/*
		

		const mintTokenId = '100';
		const mintTokenUri = 'https://gogodino.saltmarble.io/metaexplorers/json/100.json';

		const tx = {
			from: ownerAddress,
			to: contractAddress,
			value: 0,
			input: '0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000576616c7565000000000000000000000000000000000000000000000000000000',
			gas: 500000,
			submit: true
		}
		const result = await caver.kas.wallet.requestSmartContractExecution(tx)
		*/



	} catch (err) {
		console.log("err",err);
		//res.status(500).json({ message: "Internal Server Error!" });
	}





	try {

		const { wallet } = req.query;

		console.log("wallet",wallet);
		
		const  contractName = 'GOGODINO Official';

		
		const query = {
			size: 100,
			cursor: 'PdOALgqNme5a9vJ6aKDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};
		

		/*
		const queryOptions = {
			kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
			size: 100
		}
		*/

		const queryOptions = {
			kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
			size: 100,
			caFilter: contractAddress,
		}


		const ownedNfts = new Array();


		const nftQuery = {
			size: 100,
			//cursor: 'PdOALgqNmea5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

		//console.log(query);

		const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, nftQuery);
		//const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet);
		//const data = await caver.kas.tokenHistory.getNFTList(contractAddress, query);
		
		// error !!!!!!
		//const data = await caver.kas.kip17.getTokenListByOwner(contractAddress, wallet); 
	
		//console.log(data);


		console.log("data.items.length="+data.items.length);


		

		for(let idx=0; idx < data.items.length; idx++){
		

			//console.log(data.items[idx]);

			const nft = new Object();

			

			try {

				//nft.owner = data.itmes[idx].owner;  error

				nft.owner = wallet;

				const response = await fetch(data.items[idx].tokenUri);

				//console.log(response);

				const contract = new Object();
				contract.address = contractAddress;
				contract.name = contractName;
				nft.contract = contract;

				nft.tokenId = caver.utils.hexToNumber(data.items[idx].tokenId);

				if (response.ok) {

					const jsonTokenUri = await response.json();

					//console.log(jsonTokenUri.name);
					//console.log(jsonTokenUri.image);


					const media = new Array() ;
			
						
					// 객체 생성
					const mediadata = new Object() ;
					
					mediadata.gateway = jsonTokenUri.image;
					
					// 리스트에 생성된 객체 삽입
					media.push(mediadata);
					

					nft.title = jsonTokenUri.name;

					//console.log("nft.title="+nft.title);


					nft.media = media;
					nft.description = jsonTokenUri.description;


					nft.staking = "false";
					ownedNfts.push(nft);

			
				} else {
					console.log("fetch tokenUri error="+data.items[idx].tokenUri);
				}
			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log("err",err);
			}


		}

		const aaa = new Object();

		aaa.ownedNfts = ownedNfts;

		//console.log(aaa);

		/*

		const results = ownedNfts;


		console.log(JSON.stringify(results));
		*/



		/*
		{
contract: [Object],
tokenId: '1845',
tokenType: 'ERC721',
title: 'Skell Yeah #1845',
description: "They're rowdy little punks, got no respect! Try to shut 'em down, you're gonna get decked! They do what they want, get out of their way! Skell Yeah is here and they're here to stay!",
timeLastUpdated: '2022-07-03T21:13:06.035Z',
metadataError: undefined,
rawMetadata: [Object],
tokenUri: [Object],
media: [Array],
spamInfo: undefined,
balance: 1
}
		*/



	
		
		//const results = await alchemy.nft.getNftsForOwner(wallet);
		//console.log(JSON.stringify(results));
		


		//res.json({ message: "Fetch successful!", data: results });

		/*
		const fs = require('fs');
		fs.writeFileSync('./' + contractAddress + '.json', JSON.stringify(aaa));
		*/

		res.json({ message: "Fetch successful!", data:  aaa});


	} catch (err) {

		console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



