// filename: ./inngest/runBackfillForUser.js
import { createFunction } from "inngest";
import { runBackfillForUser }  from "../lib/backfill-scripts";

import CaverExtKAS from "caver-js-ext-kas";


export default createFunction(

  "Run backfill for user",     // The name displayed in the Inngest dashboard

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

    try {

      const user_id = event.data.user_id;
      console.log("user_id",user_id);


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
    



    
    /*
    return {
      status: 200,
      message: `Ran backfill for user ${event.data.user_id}`,
    };
    */


  }

);
