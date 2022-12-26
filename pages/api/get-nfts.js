import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
import { consoleLog } from "mocha/lib/reporters/base";
//import { calculateOverrideValues } from "next/dist/server/font-utils";


// ----------------------------
const alchemy = new Alchemy({
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
});


//const chainId = "8217"; // cypress
const chainId = "1001"; // baobab
const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
// Set an authorization through 'caver.initKASAPI' function
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

//caver.initKIP17API(chainId, accessKeyId, secretAccessKey);




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

		console.log("wallet="+wallet);


		//const contractAddress = '0xf57255329ad3f60b19cb452b68546e11f1fe20df'; // cypress contract
		const contractAddress = '0x3f7a4d253c954ba0deb1c0ac2c031595c02f231b'; // baobab contract
		
		const  contractName = 'GOGODINO Official';

		
		const query = {
			size: 100,
			cursor: 'PdOALgqNme5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
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

		const stakingWallet = "0x0a3548D4621075B2E5B9c6B2e99B9B61d19570db";

/*
const query = {
   kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
   size: 1,
   range: '1593529200,1599145200',
   caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
}
const result = await caver.kas.tokenHistory.getTransferHistoryByAccount('0x76c6b1f34562ed7a843786e1d7f57d0d7948a6f1', query)
*/

		/*
		const transferQuery = {
			kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
			size: 100,
			caFilter: contractAddress,
		}

		const transfers = await caver.kas.tokenHistory.getTransferHistoryByAccount(stakingWallet, transferQuery);

		//console.log("transfers="+JSON.stringify(transfers));


		for(let idx=0; idx < transfers.items.length; idx++){

			console.log("from="+transfers.items[idx].transaction.from);
			console.log("timestamp="+transfers.items[idx].transaction.timestamp);
			console.log("tokenId="+caver.utils.hexToNumber(transfers.items[idx].tokenId));

		}
		*/



		//const contracts = await caver.kas.kip17.getContractList({ size: 1, cursor: 'eyJjcdsfads' });
		//const contracts = await caver.kas.kip17.getContractList({ size: 1, cursor: 'eyJjc...' });
		//console.log("contracts="+JSON.stringify(contracts));



		//const stakingData = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, stakingWallet, query);

		//console.log("stakingWallet="+stakingWallet);


		const stakingData = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, stakingWallet, query);

		//const stakingData = await caver.kas.kip17.getTokenListByOwner(contractAddress, stakingWallet, query);

	


		//console.log("stakingData="+JSON.stringify(stakingData));

		console.log("stakingData.items.length="+stakingData.items.length);


		for(let idx=0; idx < stakingData.items.length; idx++){

			const nft = new Object();

			try {

				nft.owner = stakingData.items[idx].owner;

				const media = new Array() ;
				
				
				const contract = new Object();
				contract.address = contractAddress;
				contract.name = contractName;

				nft.contract = contract;

				nft.tokenId = caver.utils.hexToNumber(stakingData.items[idx].tokenId);
				
				//nft.tokenId = stakingData.items[idx].tokenId;

				//console.log("nft.tokenId="+nft.tokenId);



				let isStaking = false;

				const transferQuery = {
					kind: [caver.kas.tokenHistory.queryOptions.kind.NFT],
					size: 100,
					caFilter: contractAddress,
				}
		
				const transfers = await caver.kas.tokenHistory.getTransferHistoryByAccount(stakingWallet, transferQuery);
		
				//console.log("transfers="+JSON.stringify(transfers));
		
		
				for(let idx=0; idx < transfers.items.length; idx++){

					console.log("transfer from="+transfers.items[idx].transaction.from);
					//console.log("transfer tokenId="+caver.utils.hexToNumber(transfers.items[tidx].tokenId));

					
		
					if (transfers.items[idx].transaction.from == wallet) {

						//console.log("transfer from="+transfers.items[idx].transaction.from);
						//console.log("transfer timestamp="+transfers.items[idx].transaction.timestamp);
						//console.log("transfer tokenId="+caver.utils.hexToNumber(transfers.items[idx].tokenId));

						if (caver.utils.hexToNumber(transfers.items[idx].tokenId) == nft.tokenId) {

								isStaking = true;
						}

					}
					
		
				}



				if (isStaking) {

					const response = await fetch(stakingData.items[idx].tokenUri);

					if (response.ok) {

						const jsonTokenUri = await response.json();

						console.log("jsonTokenUri="+JSON.stringify(jsonTokenUri));

						// 객체 생성
						const mediadata = new Object() ;
						mediadata.gateway = jsonTokenUri.image;
						
						// 리스트에 생성된 객체 삽입
						media.push(mediadata);

						nft.title = jsonTokenUri.name;

						nft.media = media;

						nft.description = jsonTokenUri.description;

					} else {
						console.log("fetch tokenUri error="+data.items[idx].tokenUri);
					}

					nft.staking = "true";

					ownedNfts.push(nft);

				}
			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log("err="+err);
			}

		}








		const nftQuery = {
			size: 100,
			cursor: 'PdOALgqNme5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
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
				console.log("err="+err);
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

		console.log("Fetch successful!");


	} catch (err) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



