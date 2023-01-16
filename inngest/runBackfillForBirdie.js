// filename: ./inngest/runBackfillForUser.js
import { createFunction } from "inngest";
import { runBackfillForUser }  from "../lib/backfill-scripts";

import CaverExtKAS from "caver-js-ext-kas";


export default createFunction(

  "Run backfill for birdie",     // The name displayed in the Inngest dashboard

  "retool/backfill.requested", // The event triggger

  async ({ event }) => {

    const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.KAS_SECRET_ACCESS_KEY;

    
    /*
    const result = await runBackfillForUser(event.data.user_id);

    return {
      status: result.ok ? 200 : 500,
      message: `Ran backfill for user ${event.data.user_id}`,
    };
    */


    const user_id = event.data.user_id;
    console.log("user_id",user_id);


    /*
    
    try {
      
      const chainId = "1001";
      const contractOwnerAddress = "0x65410526d780ecbf15be9b8c5446364b9a4c71af";
      const contractAddress = "0xd3bfc0bf408c0fd73e44110349c6db2e60b35be1"; // Bellygom World
      const wallet = "0xf0E392D26e21BA67a692fbE763C103d88c371D5f";
      const baseURI = "https://belly.bellygom.world";

      console.log("minting start");
  
  
      const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);
 
  
      const totalSupply = await caver.kas.wallet.callContract(contractAddress, 'totalSupply');
  
      const tokenId = parseInt(caver.utils.toBN(totalSupply.result)) + 1;
  
      const tokenUri = `${baseURI}/${tokenId}.json`;
  
      console.log("totalSupply.result", totalSupply.result);

  
      const result = await caver.kas.kip17.mint (
        contractAddress,
        wallet,
        caver.utils.toHex(tokenId),
        tokenUri
      );
  
      console.log("caver.kas.kip17.mint result", result);
  

      return {
        status: 200,
        message: `Ran backfill for user ${event.data.user_id}`,
      };


    } catch (err) {

      console.log("err", err);

      return {
        status: 500,
        message: "Internal Server Error!",
      };
      
    }
    */




    const ownedNfts = new Array();

		const nftQuery = {
			size: 100,
			//cursor: 'PdOALgqNmea5a9vJ6KDBAZ4gzwx6alLo1Q5mX7q2Oz2d7e8PrK1Jpwbm9LZ6D0lRxNnvx4BMAVXNE5Qao3kqgWGYOp9rW8Y3GEDM0deNPbKvkJVEz4oXVrY0Wxk1lbp7B'
		};

    
		const contractAddress = "0xfbcfa5bf7b472921bb5a3628a2a9ec9b4c1cabbc"; // sunmiya club
    const contractName = "";


		const data = await caver.kas.tokenHistory.getNFTList(contractAddress, nftQuery);
		

    console.log("runBackfillForBirdie data", data);


		for(let idx=0; idx < data.items.length; idx++){
	
			const nft = new Object();

			try {
				//nft.owner = data.itmes[idx].owner;  error

				nft.owner = data.items[idx].owner;

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

			} catch (err) {
				//alert("There was an error fetching NFTs!");
				//return;
				console.log("err",err);
			}
			
			ownedNfts.push(nft);

      
		}

    










  }

);
