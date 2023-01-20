import { ethers, network, run } from "hardhat";

async function main() {
  const priceFeedAddress = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";

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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});