//import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
import { consoleLog } from "mocha/lib/reporters/base";
//import { calculateOverrideValues } from "next/dist/server/font-utils";
import walletAddress from "../../constants/walletAddress.json";

// ----------------------------
/*
const alchemy = new Alchemy({
	apiKey: process.env.API_KEY,
	network: Network.ETH_MAINNET,
});
*/

//const chainId = "8217"; // cypress
//const chainId = "1001"; // baobab


/*
const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
*/

// wayne@nuklabs.com
const accessKeyId = "KASK0BAC1GACFO1CKKQ7X8C0";
const secretAccessKey = "5MYKVnvXI2kDb7RxNL_UUgOFOrHEhJo0QCbDa4dG";




// Set an authorization through 'caver.initKASAPI' function
//const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

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

	///console.log("game-fetch-nfts-more req",req);

	try {

		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}

		const { chainid, contract, wallet, stakingwallet } = req.query;


		//console.log("game-fetch-nfts-more chainid", chainid);
		//console.log("game-fetch-nfts-more contract", contract);
		//console.log("game-fetch-nfts-more wallet", wallet);
		///console.log("game-fetch-nfts-more stakingwallet", stakingwallet);


		const caver = new CaverExtKAS(chainid, accessKeyId, secretAccessKey);


		const chainId = chainid;
		let contractAddress = contract;

		let contractName = "";
		let contractSymbol = "";



		if (contractAddress === "0xfb5611f91ce965893d1d36195587233fa04691a6") {   // 0xfb5611f91ce965893d1d36195587233fa04691a6
			contractName = "GOGO DINO META EXPLORERS";
			contractSymbol = "GDX";
		} else if (contractAddress === "0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc") { // 0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc
			contractName = "Sunmiya Club";
			contractSymbol = "MIYA";
		} else if (contractAddress === "0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1") {  // 0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1
			contractName = "Bellygom World";
			contractSymbol = "BELLYGOM";
		} else if (contractAddress === "0xf57255329ad3f60b19cb452b68546e11f1fe20df") { // GDX cypress
			contractName = "GOGO DINO META EXPLORERS";
			contractSymbol = "GDX";
		}


		let miningAmountTotal = 0;

		// staked NFTs

		/*

		

		const response = await fetch(`http://wallet.treasureverse.io/gogostakingmore?chainid=${chainid}&contract=${contractAddress}`);

		const ownedNfts = new Array();
		
		if (response.ok) {

			const json = await response.json();

			//console.log("game-fetch-nfts-more json", json);


			for(let idx=0; idx < json.items.length; idx++){

				//console.log("item tokenId", json.items[idx].tokenId);
				//console.log("item regDatetime", json.items[idx].regDatetime);

				miningAmountTotal = miningAmountTotal + Number(json.items[idx].miningAmount);

				const nft = new Object();

				nft.owner = wallet;

				nft.tokenId = json.items[idx].tokenId;

				nft.timeLeft = "4 years 11 month 354 days";

				nft.timeStart = json.items[idx].regDatetime;

				nft.maturityLevel = "Level 1";

				nft.miningAmount = json.items[idx].miningAmount;

				//console.log("json.items[idx].tokenId", json.items[idx].tokenId );
				//console.log("json.items[idx].miningAmount", json.items[idx].miningAmount );


				nft.selected = false;

				nft.staking = "true";

				const contract = new Object();
				contract.address = contractAddress;
				contract.name = contractName;
				contract.symbol = contractSymbol;
				nft.contract = contract;


				const media = new Array() ;
				nft.media = media;

				const mediadata = new Object() ;
						
				media.push(mediadata);

				nft.title = "";
				
				nft.description = "";

				////console.log(json.items[idx].uri);

				const response = await fetch(json.items[idx].uri);

				if (response.ok) {
	
					const jsonTokenUri = await response.json();
					
					mediadata.gateway = jsonTokenUri.image;
					
					nft.title = jsonTokenUri.name;
					
					nft.description = jsonTokenUri.description;
			
				} else {
					//console.log("fetch tokenUri error="+data.items[idx].tokenUri);
				}



				ownedNfts.unshift(nft);

			}

		}
		*/


		// staked NFTs
		// stakingwallet


		const ownedNfts = new Array();

		const nftQuery = {
			size: 100,
			//cursor: 'PdOALgqNmea5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};





		//contractAddress = "0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1"; // bellygom world


		let data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, stakingwallet, nftQuery);

		console.log("game-fetch-nfts-more data.items.length", data.items.length);

		//console.log("game-fetch-nfts-more data", data);


		for(let idx=0; idx < data.items.length; idx++){
	
			const nft = new Object();

			try {
				//nft.owner = data.itmes[idx].owner;  error

				////nft.owner = wallet;
				nft.owner = data.items[idx].previousOwner;

				const contract = new Object();
				contract.address = contractAddress;


				contract.name = contractName;
				nft.contract = contract;

				nft.tokenId = caver.utils.hexToNumber(data.items[idx].tokenId);
				nft.tokenUri = data.items[idx].tokenUri;


				const media = new Array() ;
				nft.media = media;


				////console.log("data.items[idx].tokenUri", data.items[idx].tokenUri);


				const response = await fetch(data.items[idx].tokenUri);

				if (response.ok) {

					const jsonTokenUri = await response.json();

					//console.log(jsonTokenUri.name);
					//console.log(jsonTokenUri.image);

					// 객체 생성
					const mediadata = new Object() ;
					
					if (jsonTokenUri) {
						mediadata.gateway = jsonTokenUri.image;
					} else {
						mediadata.gateway = "";
					}
					
					// 리스트에 생성된 객체 삽입
					media.push(mediadata);

			
					nft.title = jsonTokenUri.name;
					
					nft.description = jsonTokenUri.description;

			
				} else {
					//console.log("fetch tokenUri error="+data.items[idx].tokenUri);
				}


				nft.timeLeft = "0 years 0 month 0 days";
				nft.maturityLevel = "Level 0";
				nft.miningAmount = "0.00000000";


				if (idx === 0) {
					nft.selected = true;
				} else {
					nft.selected = false;
				}

				nft.staking = "true";

			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log("err",err);
			}
			
			ownedNfts.push(nft);
		}


		
		/*
		contractAddress = "0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc"; // sunmiya club

		data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, stakingwallet, nftQuery);
		

		for(let idx=0; idx < data.items.length; idx++){
	
			const nft = new Object();

			try {
				//nft.owner = data.itmes[idx].owner;  error

				nft.owner = wallet;

				const contract = new Object();
				contract.address = contractAddress;


				contract.name = contractName;
				nft.contract = contract;

				nft.tokenId = caver.utils.hexToNumber(data.items[idx].tokenId);
				nft.tokenUri = data.items[idx].tokenUri;


				const media = new Array() ;
				nft.media = media;


				////console.log("data.items[idx].tokenUri", data.items[idx].tokenUri);


				const response = await fetch(data.items[idx].tokenUri);

				if (response.ok) {

					const jsonTokenUri = await response.json();

					//console.log(jsonTokenUri.name);
					//console.log(jsonTokenUri.image);

					// 객체 생성
					const mediadata = new Object() ;
					
					if (jsonTokenUri) {
						mediadata.gateway = jsonTokenUri.image;
					} else {
						mediadata.gateway = "";
					}
					
					// 리스트에 생성된 객체 삽입
					media.push(mediadata);

			
					nft.title = jsonTokenUri.name;
					
					nft.description = jsonTokenUri.description;

			
				} else {
					//console.log("fetch tokenUri error="+data.items[idx].tokenUri);
				}


				nft.timeLeft = "0 years 0 month 0 days";
				nft.maturityLevel = "Level 0";
				nft.miningAmount = "0.00000000";


				if (idx === 0) {
					nft.selected = true;
				} else {
					nft.selected = false;
				}

				nft.staking = "true";

			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log("err",err);
			}
			
			ownedNfts.push(nft);
		}
		*/






		const aaa = new Object();

		aaa.ownedNfts = ownedNfts;

		res.json({ message: "Fetch successful!", data: aaa, miningAmountTotal: miningAmountTotal});


	} catch (err) {

		console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



