//import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { BytesLike } from "ethers/lib/utils";



//import ContractAbi from "../artifacts/contracts/KlayBank.sol/KlayBank.json";

import ContractAbi from "../artifacts/contracts/ERC721Staking.sol/ERC721Staking.json";

import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants";



dotenv.config();

async function main() {

    //const account = "0x09dc47CA1223D234fdD7D24714b03d1f7C5A8fA9";

    //const account = "0x4771715b1903FCf55DFbfeFfd091Ee836Ad06D51"; // KlayBank

    //const account = "0x22571950F07e5acb92160E133B3878267c86aF56";

    const account = "0xEf3e790e3cECf0142CD85e1926Af89A6c75a8B63"; // ERC721Staking
    
    const url = "https://api.baobab.klaytn.net:8651";
  

    // @ts-ignore
    const priv : BytesLike = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(url);
    //const wallet = new ethers.Wallet(priv, provider);

    const signer = new ethers.Wallet(priv, provider);
    
  
     // Getting the signer
    //const signer = provider.getSigner();

  
    // Creating a new contract factory with the signer, address and ABI
    let contract = new ethers.Contract(
        account,
        ContractAbi.abi,
        signer
    );

    /*
    const receipt = await contract.deposit();
    console.log(receipt);
    */

    const receipt = await contract.stake([366]);
    console.log(receipt);

    /*
    const tx = await wallet.sendTransaction({
            to: account,
            value: "9000000000000000000",
            //gasPrice: 250000000000,
            gasPrice: 250000000000,
            //maxFeePerGas: 25000000000,
            //maxPriorityFeePerGas: 25000000000,
            //gasLimit: 21000,
            gasLimit: 21000,
        })

    const receipt = await tx.wait()
    console.log(receipt);
    */

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});