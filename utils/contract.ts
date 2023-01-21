import ContractAbi from "../artifacts/contracts/OurTube.sol/Ourtube.json";

import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants";

export default function getContract() {

  // Creating a new provider
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);

  /*
  let web3;
  if (window.ethereum) {
    web3 = window.ethereum;
  } else {
    web3 = ExternalProvider;
  }
  const provider = new ethers.providers.Web3Provider(web3);
  */

   // Getting the signer
  const signer = provider.getSigner();

  // Creating a new contract factory with the signer, address and ABI
  let contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractAbi.abi,
    signer
  );
  console.log(contract);

  return contract;
}
