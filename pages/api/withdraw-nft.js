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


const accessKeyId = process.env.KAS_ACCESS_KEY_ID_WAYNE;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY_WAYNE;
// Set an authorization through 'caver.initKASAPI' function
//const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

//caver.initKIP17API(chainId, accessKeyId, secretAccessKey);


const stakingWalletAddress = process.env.STAKING_WALLET_ADDRESS_WAYNE;

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

		const { stakingwallet, chainid, contract, wallet, tokenid } = req.query;

		console.log("withdraw-nft stakingwallet",stakingwallet);
		console.log("withdraw-nft chainid",chainid);
		console.log("withdraw-nft contract",contract);
		console.log("withdraw-nft wallet",wallet);
		console.log("withdraw-nft tokenid",tokenid);


		const stakingWalletAddress = stakingwallet;

		const contractAddress = contract;

		const tokenId = tokenid;



		const caver = new CaverExtKAS(chainid, accessKeyId, secretAccessKey);


		//-------- mint -------------------

		//const data = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, wallet, nftQuery);

		/*
		개인키(private key)를 사용하여 키링(keyring)을 만들고 그 키링을 caver.wallet에 추가합니다. 이렇게 추가한 키링은 나중에 계약을 발행할 때 사용됩니다.
		
		// Add a keyring to caver.wallet
		const privateKey = fs.readFileSync(".secret").toString().trim();
		const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
		caver.wallet.add(deployer);
		const abi = Artifact.compilerOutput.abi;
		const data = Artifact.compilerOutput.evm.bytecode.object;
		const contract = caver.contract.create(abi);
		const deployed = await contract.deploy({from: deployer.address, gas}, data)

		const deployed = caver.contract.create(abi, contractAddress)
		const receipt = await deployed.send({from: deployer.address, gas},
      'mintWithTokenURI', toAddress, 1, `${baseURI}/1`)
		*/


		/*
		const keyringContainer = new caver.keyringContainer()
const keyring = keyringContainer.add(keyringContainer.keyring.createFromPrivateKey(senderPrivateKey))

const contractAddress ='0x...'
const abi = [ {...}, {...}, ... ]

const contract = caver.contract.create(abi, contractAddress)
contract.setWallet(keyringContainer)
contract.events.callevent(
    {
        fromBlock: 61517244,
        toBlock: 'latest',
    },
    (error, data) => {
        console.log(`callevent: ${data}`)
    }
)

const options = {
    from: keyring.address,
    gas: 30000,
}
await contract.methods.say().send(options)
*/


		
/*
const keyring = caver.wallet.keyring.createFromPrivateKey("privagekey");
const address = keyring.address;
const key = keyring.key.privateKey;

const ret = await caver.kas.wallet.migrateAccounts([{ address, key }]);
console.log("ret", ret);
*/

		/*
		const stakingWalletPrivateKey = process.env.STAKING_WALLET_PRIVATE_KEY_WAYNE;

		const keyring = caver.wallet.keyring.createFromPrivateKey(stakingWalletPrivateKey);
		const address = keyring.address;
		const key = keyring.key.privateKey;

		const ret = await caver.kas.wallet.migrateAccounts([{ address, key }]);

		console.log("address", address);
		console.log(ret);

		RegistrationStatusResponse { status: 'ok' }
		*/


		/*
		const account = await caver.kas.wallet.createAccount();
		console.log("account", account);
		*/

		

		/*
		const gas = 150000000;

		const deployed = caver.contract.create(contractABI, contractAddress);
		*/

		/*
		const result = await caver.kas.kip17.mint (
			contractAddress,
			wallet,
			caver.utils.toHex(tokenId),
			tokenUri
		);
		*/

		//console.log("deployed", deployed);





		/*
		deployed.events
		.allEvents()
		.on('data', event => {
			console.log("event", event);
		})
		.on('error', console.error)
		*/


		const withdrawTokenId = parseInt(caver.utils.toBN(tokenId));

		
		console.log("contractAddress", contractAddress);
		console.log("stakingWalletAddress", stakingWalletAddress);

		console.log("wallet", wallet);

		console.log("withdraw-nft withdrawTokenId", withdrawTokenId);


		/*
		const receipt = await deployed.send(
			{from: stakingWalletAddress, gas},
			'transferFrom',
			stakingWalletAddress,
			wallet,
			withdrawTokenId
		);
		*/

		const result = await caver.kas.kip17.transfer(
			contractAddress,
			stakingWalletAddress,
			stakingWalletAddress,
			wallet,
			caver.utils.toHex(withdrawTokenId)
		);

		console.log("caver.kas.kip17.transfer result", result);



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




			const response = await fetch(`http://wallet.treasureverse.io/gogowithdraw?chainid=${chainid}&wallet=${wallet}&tokenid=${tokenId}`);

			if (response.ok) {

			}






			return;

		} else {

			res.status(500).json({ message: "Internal Server Error!" });

		}

	} catch (err) {

		console.log("err",err);
		res.status(500).json({ message: "Internal Server Error!" });
	}
	

}



