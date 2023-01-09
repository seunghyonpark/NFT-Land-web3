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
const chainId = "1001"; // baobab
const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
// Set an authorization through 'caver.initKASAPI' function
//const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

//caver.initKIP17API(chainId, accessKeyId, secretAccessKey);


const stakingWalletAddress = process.env.STAKING_WALLET_ADDRESS;

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

		const { chainid, contract, wallet, tokenid, uri } = req.query;

		console.log("deposit-nft chainid",chainid);
		console.log("deposit-nft contract",contract);
		console.log("deposit-nft wallet",wallet);
		console.log("deposit-nft tokenid",tokenid);
		console.log("deposit-nft uri",uri);


		console.log("deposit-nft stakingWalletAddress", stakingWalletAddress);


		const caver = new CaverExtKAS(chainid, accessKeyId, secretAccessKey);



		const tokenId = tokenid;



		const response = await fetch(`http://wallet.treasureverse.io/gogodeposit?chainid=${chainid}&contract=${contract}&wallet=${wallet}&tokenid=${tokenId}&uri=${uri}`);

		//console.log("response", response);

		const nft = "";

		res.json({ message: "Deposit successful!", data: nft});
		return;

	} catch (err) {

		console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
	

}



