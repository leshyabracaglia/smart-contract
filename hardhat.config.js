require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// These come from your .env file — never hardcode secrets here
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL || "";
const PRIVATE_KEY         = process.env.PRIVATE_KEY         || "";

// A valid private key is 32 bytes = 64 hex chars after the 0x prefix
const isValidKey = /^0x[0-9a-fA-F]{64}$/.test(PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: "WFXYPDA1P55KR3D9J7G6K7C26C1RZSUV5T",
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    // "hardhat" is the built-in local network — used automatically during testing
    hardhat: {},

    // Sepolia testnet
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: isValidKey ? [PRIVATE_KEY] : [],
    },
  },
};
