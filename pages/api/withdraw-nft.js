//import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";
import { json } from "mocha/lib/reporters";
import { consoleLog } from "mocha/lib/reporters/base";
//import { calculateOverrideValues } from "next/dist/server/font-utils";


import contractABI from "../../constants/contractABI.json";
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

	try {


		if (req.method !== "GET") {
			return res.status(400).json({
				message: "Invalid method",
			});
		}

		// 버그수정전에 임시로 차단
		/*
		return res.status(400).json({
			message: "Invalid method",
		});
		*/

		const { stakingwallet, chainid, contract, wallet, tokenid } = req.query;

		/*
		console.log("withdraw-nft stakingwallet",stakingwallet);
		console.log("withdraw-nft chainid",chainid);
		console.log("withdraw-nft contract",contract);
		console.log("withdraw-nft wallet",wallet);
		console.log("withdraw-nft tokenid",tokenid);
		*/

		const stakingWalletAddress = stakingwallet;

		const contractAddress = contract;

		const tokenId = tokenid;

		const chainId = chainid;



		const caver = new CaverExtKAS(chainid, accessKeyId, secretAccessKey);






		

		const response = await fetch(`http://wallet.treasureverse.io/gogowithdraw?contract=${contractAddress}&chainid=${chainid}&wallet=${wallet}&tokenid=${tokenId}`);


		//console.log("withdraw-nft response", response);

			
		if (response.ok) {

			const json = await response.json();

			if (json.result === "fail") {
				//console.log("withdraw-nft error");

				res.status(500).json({ message: "Internal Server Error!" });
				return;
			}

		} else {
			//console.log("withdraw-nft error");

			res.status(500).json({ message: "Internal Server Error!" });
			return;
		}



		const withdrawTokenId = parseInt(caver.utils.toBN(tokenId));



		//console.log("withdraw-nft contractABI", contractABI)

		const fromAddress = stakingWalletAddress;



		const gas = 1000000;

		const deployed = caver.contract.create(contractABI, contractAddress);

		const result = await deployed.send (
			{from: fromAddress, gas},
			'transferFrom',
			fromAddress,
			wallet,
			withdrawTokenId
		);
		
		//console.log("withdraw-nft transferFrom result", result);





		//console.log("withdraw-nft receipt", receipt);

		if (result) {

			const data = await caver.kas.tokenHistory.getNFT(contractAddress, withdrawTokenId);

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
					//console.log("fetch tokenUri error="+data.items[idx].tokenUri);
				}
			
			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log("err",err);
			}

			res.json({ message: "Withdraw successful!", data: nft});



			return;

		} else {

			res.status(500).json({ message: "Internal Server Error!" });

		}

	} catch (err) {

		console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
	

}



