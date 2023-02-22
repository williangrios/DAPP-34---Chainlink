const hre = require("hardhat");

async function main() {

  const CHAINLINK = await hre.ethers.getContractFactory("ChainlinkOracle");
  const chainlink = await CHAINLINK.deploy();

  await chainlink.deployed();

  console.log(
    `Deployed to ${chainlink.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
