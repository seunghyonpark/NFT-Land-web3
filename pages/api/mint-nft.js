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


const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;
// Set an authorization through 'caver.initKASAPI' function
//const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

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


		const { chainid, owner, contract, wallet } = req.query;

		console.log("mint-nft chainid", chainid);

		//////////const contractOwnerAddress = owner;

		const contractAddress = contract;


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






		//console.log(process.env.OWNER_PRIVATE_KEY_GDX);
		
		/*
		const keyring = caver.wallet.keyring.createFromPrivateKey(process.env.OWNER_PRIVATE_KEY_WAYNE);
		const address = keyring.address;
		const key = keyring.key.privateKey;

		const ret = await caver.kas.wallet.migrateAccounts([{ address, key }]);
		
		console.log("migrateAccounts ret", ret);
		*/


		/*
		RegistrationStatusResponse {
			status: 'all failed',
			failures: RegistrationFailure {
			  '0x3ffdd8771021451f9a4ec50b4413598d8a65b21b': 'failed to send a raw transaction to klaytn node; invalid transaction v, r, s values of the sender'
			}
		  }
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

		/*
		const account = await caver.kas.wallet.createAccount();
		console.log("account", account);
		*/

		/*
		Account {
			address: '0x7B745b7D98564d9E7329a3301834cc312D48549F',
			chainId: 1001,
			createdAt: 1673275134,
			keyId: 'krn:1001:wallet:0ff2e9e4-0b76-458b-9736-633e6b1f2746:account-pool:default:0x1ccca3e6e9c52acc14edb3e93b30b8ad5b687fe63f7ff0b044fd218cf4558bac',
			krn: 'krn:1001:wallet:0ff2e9e4-0b76-458b-9736-633e6b1f2746:account-pool:default',
			publicKey: '0x0471a7d033c21ec155623bd9e11a9d845c9f4bccc2e17cf2178f0407633b8cbc69338b52463e3903736d1b181b46f59e7d3c2883147158e05e2177d6b068e104f9',
			updatedAt: 1673275134
		  }
		*/
	



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


		//console.log("mint-nft contractAddress", contractAddress);
		//console.log("mint-nft contractOwnerAddress", contractOwnerAddress);


		//const baseURI = 'https://gogodino.saltmarble.io/metaexplorers/json';

		//const baseURI = 'https://miya.sunmiya.club';

		//const baseURI = "https://belly.bellygom.world";

		
		/*
		  // KAS: Create a Klaytn account.
		  const result5 = await caver.kas.wallet.createAccount();
		  //user.address = result.address;
		  console.log("res", result5);
		*/			




		const totalSupply = await caver.kas.wallet.callContract(contractAddress, 'totalSupply');

		const tokenId = parseInt(caver.utils.toBN(totalSupply.result)) + 1;





		/*
		
		const chainidCypress = "8217";
		const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
		//const contractAddressOriginal = "0x7b19bf9abe4119618f69aebb78b27f73cdaa4182"; // BIRDIESHOT (BIRDIE)
		const contractAddressOriginal = "0xbaf8864ee1b5f2be3dcd637203aed524b86db4e4"; // ArcheWorld_FandomCard

		const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
		
		
		console.log("mint-nft dataNFT", dataNFT); 
		*/
		
		/*
		Nft {
			owner: '0xa284204de7ba3e6b9eb97ab60fb16dbed8d97a54',
			previousOwner: '0x374ef089f5cd5cf08b7455eebb33b2141a573cf3',
			tokenId: '0x40',
			tokenUri: 'https://ipfs.archeworld.com/ipfs/QmNQNib5NBL2wPLGQAvACC7UAsHAQjx3VqhCPsodcMbifm/99084bd4e0ee6124b79c55aa9fc6942e.json',
			transactionHash: '0x61215a314b75afe7c353dc4881c4385d5ae74dea334935bc3fe38cdbd980c69d',
			createdAt: 1649086441,
			updatedAt: 1649131644
		}


		Nft {
			owner: '0x9e93e11686aa8115c06be8c6c74bdf8b9f2fd710',
			previousOwner: '0x5db32550a49dd9043784b031f838efd0eb527fa7',
			tokenId: '0xbb',
			tokenUri: 'https://live.bdst.kakaogames.com:10443/assets/nft/187',
			transactionHash: '0xc94730a19c1e63c3d60496e96d0a645f9eb899627b3bcd8a536775fdf5421542',
			createdAt: 1650884445,
			updatedAt: 1661835157
		}
		*/

		
		
		//const getNFTContractList = await caver.kas.tokenHistory.getNFTContractList();
		//console.log("getNFTContractList",getNFTContractList);

		//const getNFTContractList = await caver.kas.tokenHistory.getNFTContractList();
		//console.log("getNFTContractList",getNFTContractList);



		let tokenUri;

		

		//console.log("mint-nft contractAddress", contractAddress);


		if (contractAddress === "0xfb5611f91ce965893d1d36195587233fa04691a6"		// gogodinao baobab wayne@nuklabs.com
			|| contractAddress === "0x771b7d7c1bf142f68b8ae72575ae80a08714c714") { // gogodino baobab info@nuklabs.com

			const contractAddressOriginal = "0xf57255329ad3f60b19cb452b68546e11f1fe20df"; // gogodino cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);

			//console.log("dataNFT", dataNFT);
			
			tokenUri = dataNFT.tokenUri;

		} else if (contractAddress === "0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1"
			|| contractAddress === "0x4c941de2f98336d3854acf4ebe8e86f5db2c1a18") { // bellygom baobab

			const contractAddressOriginal = "0xce70eef5adac126c37c8bc0c1228d48b70066d03"; // bellygom cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;

		} else if (contractAddress === "0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc"
			|| contractAddress === "0xd2e641b4dccc8d7c80a020324db1fcbf457f1363") { // sunmiya club baobab

			const contractAddressOriginal = "0x8f5aa6b6dcd2d952a22920e8fe3f798471d05901"; // sunmiya club cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;

		} else if (contractAddress === "0xd8940245a37a301576eae6ea0348392ade2b8d5d"
			|| contractAddress === "0x2fc2defa84bc438178d8af42edcc3b861221d081") { // birdie baobab

			const contractAddressOriginal = "0x7b19bf9abe4119618f69aebb78b27f73cdaa4182"; // birdie cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;

		} else if (contractAddress === "0xaedd53a5526658ce286d66f63a6db28c9e79af3e"
			|| contractAddress === "0x07eafbf7390248f0e95a9311f16d8e840094dc77") { // competz baobab

			const contractAddressOriginal = "0x4d8d3ae115c5b13b4c27ab956e06d6cece9e37c0"; // competz cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;

		} else if (contractAddress === "0x24c8b2bf633672456efc8b415ea8b684498d9f79"
			|| contractAddress === "0x9812edb36c9c2ce60e06524b60c50ac0c7d1c0c1") {  // ArcheWorld_FandomCard baobab

			const contractAddressOriginal = "0xbaf8864ee1b5f2be3dcd637203aed524b86db4e4"; // ArcheWorld_FandomCard cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;
			
			//console.log("mint-nft dataNFT", dataNFT); 

		} else if (contractAddress === "0xe70a0a4cf8eb3e2adcbea09c303cb178eaec6584"
			|| contractAddress === "0x8245076be187973db1241a17d691437b9748097c") {  // Meta Toy Squard baobab

			const contractAddressOriginal = "0x9ad0e9ba4415d1987149321809d1f1e908d82926"; // Meta Toy Squard cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;
			
			//console.log("mint-nft dataNFT", dataNFT); 

		} else if (contractAddress === "0xbc497dbababe7566d9a58be51c4771ef9c947bd5"
			|| contractAddress === "0x772e5fca622c63c2d839f1f8e0d80ef1a542214b") {  // DOGESOUNDCLUB MATES baobab

			const contractAddressOriginal = "0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae"; // DOGESOUNDCLUB MATES cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;
			
			//console.log("mint-nft dataNFT", dataNFT); 
		
		} else if (contractAddress === "0x64abb4ba79c39c61d8d7e246ae21124d9ead3d2d"
			|| contractAddress === "0x64abb4ba79c39c61d8d7e246ae21124d9ead3d2d") {  // Three Kingdom Multiverse Nft baobab

			const contractAddressOriginal = "0xaf867a9752816571248abbedf0e749eaf6ed2101"; // Three Kingdom Multiverse Nft cypress

			const chainidCypress = "8217";
			const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
			const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
			
			tokenUri = dataNFT.tokenUri;
			
			//console.log("mint-nft dataNFT", dataNFT); 

		} else if (contractAddress === "0x888962ead04bcd823301929eb7e597c4582d25b0"
		|| contractAddress === "0x888962ead04bcd823301929eb7e597c4582d25b0") {  // Puuvillafriends baobab

		const contractAddressOriginal = "0xef45d7272211f7d9c9b3b509d550e8856cd9e050"; // Puuvillafriends cypress

		const chainidCypress = "8217";
		const caverCypress = new CaverExtKAS(chainidCypress, accessKeyId, secretAccessKey);
		const dataNFT = await caverCypress.kas.tokenHistory.getNFT(contractAddressOriginal, tokenId);
		
		tokenUri = dataNFT.tokenUri;
		
		//console.log("mint-nft dataNFT", dataNFT); 

		} else {
			//tokenUri = `${baseURI}/${tokenId}.json`;

			res.status(500).json({ error: "tokenUri error" });
			return;
		}



		//console.log("mint-nft tokenUri", tokenUri);



		/*		
		const result2 = await caver.kas.kip17.deploy (
			"GOGODINO Official",
			"GDX",
			"kip17-gdx"
		);
		console.log("caver.kas.kip17.deploy result", result2);
		*/
	
		/*
		const result3 = await caver.kas.kip17.deploy (
			"Sunmiya Club Official",
			"MIYA",
			"kip17-miya"
		);
		
		console.log("caver.kas.kip17.deploy result", result3);
		*/

		/*
		const result3 = await caver.kas.kip17.deploy (
			"Bellygom World Official",
			"BELLYGOM",
			"kip17-bellygom"
		);
		
		console.log("caver.kas.kip17.deploy result", result3);
		*/


		/*
		const result4 = await caver.kas.kip17.deploy (
			"BIRDIESHOT",
			"BIRDIE",
			"kip17-birdie"
		);
		
		console.log("caver.kas.kip17.deploy result", result4);
		*/


		/*
		const result5 = await caver.kas.kip17.deploy (
			"COMPETZ GAMERZ",
			"CMPZPFP",
			"kip17-cmpzpfp"
		);
		
		console.log("caver.kas.kip17.deploy result", result5);
			

		
		const result6 = await caver.kas.kip17.deploy (
			"ArcheWorld_FandomCard",
			"ArcheWorld_FandomCard",
			"kip17-archeworld-fandomcard"
		);
		
		console.log("caver.kas.kip17.deploy result", result6);
		
			
			
		const result7 = await caver.kas.kip17.deploy (
			"Meta Toy Squad",
			"MTS",
			"kip17-mts"
		);
		
		console.log("caver.kas.kip17.deploy result", result7);
			

			
		const result8 = await caver.kas.kip17.deploy (
			"DOGESOUNDCLUB MATES",
			"MATE",
			"kip17-mate"
		);
		
		console.log("caver.kas.kip17.deploy result", result8);
		*/

		/*
		const result9 = await caver.kas.kip17.deploy (
			"Three Kingdom Multiverse Nft",
			"3KMNft",
			"kip17-3kmnft"
		);
		
		console.log("caver.kas.kip17.deploy result", result9);
		*/

		/*
		const result10 = await caver.kas.kip17.deploy (
			"Puuvillafriends",
			"Puuvillafriends",
			"kip17-puuvillafriends"
		);
		
		console.log("caver.kas.kip17.deploy result", result10);
			*/
		

		/*
		ErrorResponse {
  _code: 1100159,
  _message: 'a free-tier user does not have access to the API',
  _requestId: '48fed070-c75d-4e4a-8b0b-6f8820d24c37'
}

ErrorResponse {
  _code: 1104700,
  _message: 'Invalid alias',
  _requestId: 'f59951ed-180a-9158-811d-7c89c01f422d'
}
*/


		/*
		Kip17DeployResponse {
			status: 'Submitted',
			transactionHash: '0x5e2930ff059fa598f2b0a98c5a4e55037abbd9834be57b2cc7459c5d3d1ddb22',
			options: Kip17FeePayerOptions {
			  enableGlobalFeePayer: true,
			  userFeePayer: Kip17FeePayerOptionsUserFeePayer { krn: '', address: '' }
			}
		  }

		  */


		/*
		const gas = 1000000;

		const deployed = caver.contract.create(contractABI, contractAddress);
    

		const receipt = await deployed.send(
			{from: contractOwnerAddress, gas},
			'mintWithTokenURI',
			wallet,
			tokenId,
			tokenUri
		);
		*/

				//contract address
		//0x856b4d21791b1cc9b561751797849d5e6a234ac2

		const result = await caver.kas.kip17.mint (
			contractAddress,
			wallet,
			caver.utils.toHex(tokenId),
			tokenUri
		);

		///console.log("caver.kas.kip17.mint result", result);


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

			const response = await fetch(tokenUri);

			if (response.ok) {

				const jsonTokenUri = await response.json();
		
				// 객체 생성
				const mediadata = new Object() ;
				
				mediadata.gateway = jsonTokenUri.image;
				
				// 리스트에 생성된 객체 삽입
				media.push(mediadata);

				nft.title = jsonTokenUri.name;

				console.log("mint-nft nft.title", nft.title);

				
				nft.description = jsonTokenUri.description;

				console.log("mint-nft nft.description", nft.description);



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



