//import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
import { consoleLog } from "mocha/lib/reporters/base";
//import { calculateOverrideValues } from "next/dist/server/font-utils";


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

		const { tokenid } = req.query;

		const data = await caver.kas.tokenHistory.getNFT(contractAddress, tokenid);

		console.log("data", data);
		/*
		Nft {
			owner: '0x6045c976d3ea130b2782029a8faf38236f7d1022',
			previousOwner: '0x0000000000000000000000000000000000000000',
			tokenId: '0x13d',
			tokenUri: 'https://gogodino.saltmarble.io/metaexplorers/json/317.json',
			transactionHash: '0xa7d2dc7c29367aa60680d6ed998f1f1aea0621c2f2798291c01cbc64ebe131b1',
			createdAt: 1672056872,
			updatedAt: 1672056872
		}
		*/

		const  contractName = 'GOGODINO Official';
		const nft = new Object();

		try {
			//nft.owner = data.itmes[idx].owner;  error

			nft.owner = data.owner;

			const contract = new Object();
			contract.address = contractAddress;
			contract.name = contractName;
			nft.contract = contract;

			nft.tokenId = caver.utils.hexToNumber(data.tokenId);


			const media = new Array() ;
			nft.media = media;

			const response = await fetch(data.tokenUri);

			if (response.ok) {

				const jsonTokenUri = await response.json();
		
				// 객체 생성
				const mediadata = new Object() ;
				
				mediadata.gateway = jsonTokenUri.image;
				
				// 리스트에 생성된 객체 삽입
				media.push(mediadata);

				nft.title = jsonTokenUri.name;
				
				nft.description = jsonTokenUri.description;

				nft.staking = "false";
		
			} else {
				console.log("fetch tokenUri error="+data.items[idx].tokenUri);
			}
		
		} catch (err) {
			//alert("There was an error fetching NFTs!");
			//return;
			console.log("err",err);
		}

		res.json({ message: "Fetch successful!", data: nft});


	} catch (err) {

		console.log("err",err);
		/////res.status(500).json({ message: "Internal Server Error!" });

		res.json({ message: "getNFT Error!" });
	}
}



