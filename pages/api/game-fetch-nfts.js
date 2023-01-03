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
			size: 20,
			//cursor: 'PdOALgqNmea5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

		const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, nftQuery);

		
		//console.log("game-fetch-nfts data",data);

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

				const response = await fetch(data.items[idx].tokenUri);

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



					/*
					const [timeLeft, setTimeLeft] = useState("0 years 0 month 0 days"); //4 years 11 month 354 days
					const [maturityLevel, setMaturityLevel] = useState("Level 0");
					const [miningAmount, setMiningAmount] = useState("0.00000000");
					*/

					nft.timeLeft = "0 years 0 month 0 days";
					nft.maturityLevel = "Level 0";
					nft.miningAmount = "0.00000000";


					if (idx === 0) {
						nft.selected = true;
					} else {
						nft.selected = false;
					}

					if (idx === 1) {
						nft.staking = "true";
						nft.timeLeft = "4 years 9 month 154 days";
						nft.maturityLevel = "Level 2";
						nft.miningAmount = "2.88254436";

					} else if (idx === 3) {
						nft.staking = "true";
						nft.timeLeft = "4 years 1 month 43 days";
						nft.maturityLevel = "Level 2";
						nft.miningAmount = "56.3493722";

					} else if (idx === 4) {
						nft.staking = "true";
						nft.timeLeft = "4 years 9 month 42 days";
						nft.maturityLevel = "Level 2";
						nft.miningAmount = "65.88254436";
						
					} else if (idx === 8 ) {
						nft.staking = "true";
						nft.timeLeft = "4 years 2 month 53 days";
						nft.maturityLevel = "Level 3";
						nft.miningAmount = "132.88254436";


					} else {
						nft.staking = "false";
					}
			
				} else {
					//console.log("fetch tokenUri error="+data.items[idx].tokenUri);
				}
			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				//console.log("err",err);
			}
			
			ownedNfts.push(nft);
		}

		const aaa = new Object();

		aaa.ownedNfts = ownedNfts;

		res.json({ message: "Fetch successful!", data:  aaa});


	} catch (err) {

		//console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
}



