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

		const nft = await caver.kas.tokenHistory.getNFT(contractAddress, tokenid);

		res.json({ message: "Fetch successful!", data: nft});


	} catch (err) {

		console.log("err",err);
		/////res.status(500).json({ message: "Internal Server Error!" });

		res.json({ message: "getNFT Error!" });
	}
}



