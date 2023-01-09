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


const accessKeyId = process.env.KAS_ACCESS_KEY_ID_WAYNE;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY_WAYNE;
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


		const caver = new CaverExtKAS(chainid, accessKeyId, secretAccessKey);


		const contractAddress = contract;


		if (wallet) {

		} else {
			const nftsGlobal = new Object();
			
			const response = await fetch(`http://wallet.treasureverse.io/gogostaking?chainid=${chainid}&contract=${contractAddress}`);

			if (response.ok) {
	
				const json = await response.json();
				
				console.log("game-fetch-nfts staking info json",json);

				if (json) {
					nftsGlobal.stakingCountGlobal = json.stakingCountGlobal;
					nftsGlobal.miningAmountGlobal = json.miningAmountGlobal;
				}

			}


			/*
			NftContractDetail {
				address: '0x3b92b8c9765d77c1ce6ee928e679aacbbcbed3c1',
				name: 'GOGODINO Official',
				symbol: 'GDX',
				totalSupply: '0x17b',
				createdAt: 1672223341,
				updatedAt: 1673077597,
				deletedAt: 0,
				type: 'KIP-17',
				status: 'completed'
			}
			*/

			/////console.log("game-fetch-nfts contractAddress", contractAddress);


			const data = await caver.kas.tokenHistory.getNFTContract(contractAddress);

			//console.log("game-fetch-nfts data", data);

			if (data) {
				//data.totalSupply

				nftsGlobal.mintingCountGlobal = caver.utils.hexToNumber(data.totalSupply);

				
			}



			res.json({ message: "Fetch successful!", data:  nftsGlobal});

			return;
			
		}



		//console.log("game start======");

		const  contractName = 'GOGODINO Official';


		const ownedNfts = new Array();

		const nftQuery = {
			size: 100,
			//cursor: 'PdOALgqNmea5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

		const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, nftQuery);
		//console.log("game-fetch-nfts data", data);

		//const response = await fetch("http://wallet.treasureverse.io/gogo");
		//if (response.ok) {

			//const data = await response.json();

			//console.log("game-fetch-nfts json="+JSON.stringify(json));
		//}







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



					/*
					const [timeLeft, setTimeLeft] = useState("0 years 0 month 0 days"); //4 years 11 month 354 days
					const [maturityLevel, setMaturityLevel] = useState("Level 0");
					const [miningAmount, setMiningAmount] = useState("0.00000000");
					*/



			
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

				nft.staking = "false";


			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				//console.log("err",err);
			}
			
			ownedNfts.push(nft);
		}





		// staked NFTs

		let miningAmountTotal = 0;

		const response = await fetch(`http://wallet.treasureverse.io/gogostaking?chainid=${chainid}&contract=${contractAddress}&wallet=${wallet}`);


		//console.log("game-fetch-nfts response", response);

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



