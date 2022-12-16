import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
//import { calculateOverrideValues } from "next/dist/server/font-utils";


// ----------------------------
const alchemy = new Alchemy({
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
});


//const chainId = "8217"; // cypress
const chainId = "1001"; // baobab
const accessKeyId = "KASK7LN9R0ADR0L3SP4GVN79";
const secretAccessKey = "pam2QVYUTV1iqL77sxBbTSKsBHc2ZPw6mFUHScFm";
// Set an authorization through 'caver.initKASAPI' function
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);


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

		console.log(wallet);


		//const contractAddress = '0xf57255329ad3f60b19cb452b68546e11f1fe20df'; // cypress contract
		const contractAddress = '0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b'; // baobab contract
		
		const  contractName = 'GOGODINO Official';

		const query = {
			size: 10,
			cursor: 'PdOALgqNme5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

		//console.log(query);

		const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, query);
		//const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet);
		//const data = await caver.kas.tokenHistory.getNFTList(contractAddress, query);
		
		// error !!!!!!
		//const data = await caver.kas.kip17.getTokenListByOwner(contractAddress, wallet); 
	
		//console.log(data);




		const ownedNfts = new Array();

		for(let idx=0; idx < data.items.length; idx++){
		

			//console.log(data.items[idx]);

			const nft = new Object();

			

			try {

				//nft.owner = data.itmes[idx].owner;  error

				nft.owner = wallet;

				const response = await fetch(data.items[idx].tokenUri);

				//console.log(response);

				

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
					nft.tokenId = jsonTokenUri.tokenId;

					nft.media = media;

					const contract = new Object();
					contract.address = contractAddress;
					contract.name = contractName;


					nft.contract = contract;

					nft.description = "";

					ownedNfts.push(nft);

			
				}
			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log(err);
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

		console.log("kkkkk");


	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



