require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  paths: {
    sources: './contracts',
    artifacts: './frontend/src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: process.env.WEB3_ALCHEMY_GOERLI,
      accounts: [process.env.PRIVATE_KEY_GOERLI]
    }
  }
};
