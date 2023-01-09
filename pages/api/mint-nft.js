//import { Network, Alchemy } from "alchemy-sdk";


//import Caver from "caver-js";
import CaverExtKAS from "caver-js-ext-kas";

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
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

//caver.initKIP17API(chainId, accessKeyId, secretAccessKey);

//const contractOwnerAddress = walletAddress.contractOwnerAddress;


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


		const { owner, contract, wallet, baseuri } = req.query;

		const contractOwnerAddress = owner;
		const contractAddress = contract;


		const baseURI = baseuri;



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
const account = await caver.kas.wallet.createAccount();

*/


		
		/*
		const keyring = caver.wallet.keyring.createFromPrivateKey("");
		const address = keyring.address;
		const key = keyring.key.privateKey;

		const ret = await caver.kas.wallet.migrateAccounts([{ address, key }]);
		
		console.log("migrateAccounts ret", ret);
		
	*/


		
		/*
		const keyring = caver.keyringContainer.keyring.generate();
		const address = keyring.address;
		const key = keyring.key.privateKey;
		const nonce = 0;
		
		const ret = await caver.kas.wallet.migrateAccounts([{ address, key, nonce }]);
		*/

		
		//const senderKeyring = caver.wallet.keyring.create(process.env.OWNER_PUBLIC_KEY, process.env.OWNER_PRIVATE_KEY);

		/*
		try {
			const senderKeyring = caver.wallet.keyring.createWithSingleKey(process.env.OWNER_PUBLIC_KEY, process.env.OWNER_PRIVATE_KEY);
			console.log("senderKeyring",senderKeyring);
	
		} catch (err) {

			
			console.log("err",err);

		}
		*/
		
		
		/*

		//caver.wallet.add(senderKeyring);

		//caver.wallet.updateKeyring(senderKeyring);

		
		//const keyringContainer = new caver.keyringContainer();		


		  // KAS: Create a Klaytn account.
		  const result = await caver.kas.wallet.createAccount();
		  //user.address = result.address;
		  console.log("res", result);

		  caver.klay.accounts.wallet.add(process.env.OWNER_PRIVATE_KEY);

		*/



	

		const gas = 150000000;

		const deployed = caver.contract.create(contractABI, contractAddress);




		/*
		deployed.events
		.allEvents()
		.on('data', event => {
			console.log("event", event);
		})
		.on('error', console.error)
		*/

		/*
		https://miya.sunmiya.club/1.json

		*/


		console.log("mint-nft contractAddress", contractAddress);
		console.log("mint-nft contractOwnerAddress", contractOwnerAddress);

		console.log("mint-nft baseURI", baseURI);



		//const baseURI = 'https://gogodino.saltmarble.io/metaexplorers/json';

		//const baseURI = 'https://miya.sunmiya.club';

		const totalSupply = await caver.kas.wallet.callContract(contractAddress, 'totalSupply');

		const tokenId = parseInt(caver.utils.toBN(totalSupply.result)) + 1;

		const tokenUri = `${baseURI}/${tokenId}.json`;


		console.log("mint-nft tokenId", tokenId);




		const receipt = await deployed.send(
			{from: contractOwnerAddress, gas},
			'mintWithTokenURI',
			wallet,
			tokenId,
			tokenUri
		);

		/*
		/// for vercel test
		res.json({ message: "Mint successful!", data: receipt}); 

		return;
		*/


		//console.log("mint-nft receipt", receipt);


		//console.log("blockNumber", receipt.blockNumber);

		/***********************************************************
		deployed.events
		.allEvents()
		.on('data', event => {
			console.log("event", event);
		})
		.on('error', console.error)
		*/



			/*
		deployed.events.callevent(
			{
				fromBlock: receipt.blockNumber,
				toBlock: 'latest',
			},
			(error, data) => {
				console.log(`callevent: ${data}`);
			}
		)
			*/


		/*
		

		const mintTokenId = '100';
		const mintTokenUri = 'https://gogodino.saltmarble.io/metaexplorers/json/100.json';

		const tx = {
			from: ownerAddress,
			to: contractAddress,
			value: 0,
			input: '0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000576616c7565000000000000000000000000000000000000000000000000000000',
			gas: 500000,
			submit: true
		}
		const result = await caver.kas.wallet.requestSmartContractExecution(tx)
		*/

		/*
		const nft = new Object();
		nft.tokenId = tokenId;
		res.json({ message: "Mint successful!", data:  nft});
		*/


		try {

			const  contractName = 'GOGODINO Official';
			const nft = new Object();


			//nft.owner = data.itmes[idx].owner;  error

			nft.owner = wallet;

			const contract = new Object();
			contract.address = contractAddress;
			contract.name = contractName;
			nft.contract = contract;

			nft.tokenId = tokenId;


			const media = new Array() ;
			nft.media = media;

			const response = await fetch(`${baseURI}/${tokenId}.json`);

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
				//console.log("fetch tokenUri error", response);
			}

			res.json({ message: "Mint successful!", data: nft});
		
		} catch (err) {
			console.log("err",err);

			res.status(500).json({ error: err });
		}


	} catch (err) {

		console.log("err",err);
		//console.err;
		
		
		//res.status(500).json({ message: err});

		res.status(500).json({ error: err });
	}


}



