// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { ethers, network, run } from "hardhat";

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

        // We get the contract to deploy
    const contractFactory = await ethers.getContractFactory("knft");
    const contract = await contractFactory.deploy();

    //////await ourtube.deployed();
    const WAIT_BLOCK_CONFIRMATIONS = 6;
    await contract.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);

    //console.log("Ourtube deployed to:", ourtube.address);

    console.log(`Contract deployed to ${contract.address} on ${network.name}`);

    console.log(`Verifying contract on Etherscan...`);
  
    /*
    await run(`verify:verify`, {
      address: contract.address,
      //constructorArguments: [priceFeedAddress],
    });
    */

    /*
    const priceFeedConsumerFactory = await ethers.getContractFactory("PriceConsumerV3");
    const priceFeedConsumer = await priceFeedConsumerFactory.deploy(priceFeedAddress);
  
    const WAIT_BLOCK_CONFIRMATIONS = 6;
    await priceFeedConsumer.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
  
    console.log(`Contract deployed to ${priceFeedConsumer.address} on ${network.name}`);
  
    console.log(`Verifying contract on Etherscan...`);
  
    await run(`verify:verify`, {
      address: priceFeedConsumer.address,
      constructorArguments: [priceFeedAddress],
    });
    */


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});