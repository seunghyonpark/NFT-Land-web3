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
const chainId = "1001"; // baobab
const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
// Set an authorization through 'caver.initKASAPI' function
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

//caver.initKIP17API(chainId, accessKeyId, secretAccessKey);


//const contractAddress = '0xf57255329ad3f60b19cb452b68546e11f1fe20df'; // cypress contract
const contractAddress = walletAddress.baobabNftContractAddress;; // baobab contract

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

		const { wallet } = req.query;

		const  contractName = 'GOGODINO Official';


		const ownedNfts = new Array();

		const nftQuery = {
			size: 100,
			//cursor: 'PdOALgqNmea5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

		const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, nftQuery);
		//console.log("game-fetch-nfts data="+JSON.stringify(data));

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




		const response = await fetch(`http://wallet.treasureverse.io/gogostaking?wallet=${wallet}`);

		if (response.ok) {

			const json = await response.json();

			for(let idx=0; idx < json.items.length; idx++){

				//console.log("item tokenId", json.items[idx].tokenId);
				//console.log("item regDatetime", json.items[idx].regDatetime);


				const item = await caver.kas.tokenHistory.getNFT(contractAddress, json.items[idx].tokenId);

				///console.log("item", item);



				const nft = new Object();

				try {

					

					nft.owner = wallet;
	
					const contract = new Object();
					contract.address = contractAddress;
					contract.name = contractName;
					nft.contract = contract;
	
					nft.tokenId = json.items[idx].tokenId;
					nft.tokenUri = item.tokenUri;
	
	
					const media = new Array() ;
					nft.media = media;
	
					const response = await fetch(item.tokenUri);
	
					if (response.ok) {
	
						const jsonTokenUri = await response.json();
	
						//console.log(jsonTokenUri.name);
						//console.log(jsonTokenUri.image);
	
						
				
						// 객체 생성
						const mediadata = new Object() ;
						
						mediadata.gateway = jsonTokenUri.image;
						
						// 리스트에 생성된 객체 삽입
						media.push(mediadata);
	
						
	
						nft.title = jsonTokenUri.name;
						
						nft.description = jsonTokenUri.description;
	
	
						nft.timeLeft = "4 years 11 month 354 days";

						nft.timeStart = json.items[idx].regDatetime;


						/*
						const today = new Date();
						console.log(today);
						console.log("today fullyear", today.getFullYear());

						console.log(json.items[idx].regDatetime);

						const startday = new Date(json.items[idx].regDatetime);
						console.log("startTime", startday);

						console.log("today fullyear", today.getFullYear());
						console.log("startday fullyear", startday.getFullYear());

						const inDays = Math.floor((today.getTime()-startday.getTime())/(24*3600*1000));
						

						console.log("inDays", inDays);

						const inSeconds = Math.floor((today.getTime()-startday.getTime())/1000);

						console.log("inSeconds", inSeconds);
						*/
						

						/*
						const diffYear = today.getFullYear() - json.items[idx].regDatetime.getFullYear();
						//nft.timeLeft = String(diffYear);
						*/


						nft.maturityLevel = "Level 1";
						nft.miningAmount = "0.05322324";
	
	
						nft.selected = false;

						nft.staking = "true";
						
				
					} else {
						//console.log("fetch tokenUri error="+data.items[idx].tokenUri);
					}
				
				} catch (err) {
					//alert("There was an error fetching NFTs!");
					//return;
					//console.log("err",err);
				}
				
				ownedNfts.unshift(nft);

			}

		}




		const aaa = new Object();

		aaa.ownedNfts = ownedNfts;

		res.json({ message: "Fetch successful!", data:  aaa});


	} catch (err) {

		//console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



