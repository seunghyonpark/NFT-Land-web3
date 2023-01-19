import ContractAbi from "../artifacts/contracts/OurTube.sol/Ourtube.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants";

export default function getContract() {

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

  const signer = provider.getSigner();
  let contract = new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  console.log(contract);

  return contract;
}
