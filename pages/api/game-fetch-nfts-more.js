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


const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
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

	//console.log("game-fetch-nfts req",req);

	try {

		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}

		const { chainid, contract, wallet } = req.query;


		console.log("game-fetch-nfts-more chainid", chainid);
		console.log("game-fetch-nfts-more contract", contract);
		console.log("game-fetch-nfts-more wallet", wallet);


		const caver = new CaverExtKAS(chainid, accessKeyId, secretAccessKey);


		const chainId = chainid;
		let contractAddress = contract;

		let contractName = "";
		let contractSymbol = "";



		if (contractAddress === "0x771b7d7c1bf142f68b8ae72575ae80a08714c714") {
			contractName = "GOGO DINO META EXPLORERS";
			contractSymbol = "GDX";
		} else if (contractAddress === "0xd2e641b4dccc8d7c80a020324db1fcbf457f1363") {
			contractName = "Sunmiya Club";
			contractSymbol = "MIYA";
		}


		// staked NFTs

		let miningAmountTotal = 0;

		const response = await fetch(`http://wallet.treasureverse.io/gogostakingmore?chainid=${chainid}&contract=${contractAddress}`);


		//console.log("game-fetch-nfts-more response", response);


		const ownedNfts = new Array();
		


		if (response.ok) {

			const json = await response.json();

			//console.log("game-fetch-nfts json", json);


			

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




		const aaa = new Object();

		aaa.ownedNfts = ownedNfts;

		res.json({ message: "Fetch successful!", data: aaa, miningAmountTotal: miningAmountTotal});


	} catch (err) {

		console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



