// Deploy MyToken to whichever network Hardhat is pointed at.
// Run with: npx hardhat run scripts/deploy.js --network sepolia

const hre = require("hardhat");

async function main() {
  // Token configuration — change these to whatever you want
  const TOKEN_NAME     = "qtPI";
  const TOKEN_SYMBOL   = "QTPI";
  const INITIAL_SUPPLY = 1_000_000; // 1 million tokens

  console.log("Deploying MyToken...");
  console.log(`  Name:           ${TOKEN_NAME}`);
  console.log(`  Symbol:         ${TOKEN_SYMBOL}`);
  console.log(`  Initial Supply: ${INITIAL_SUPPLY.toLocaleString()} tokens`);

  // Get the contract factory (a helper that knows how to deploy a contract)
  const MyToken = await hre.ethers.getContractFactory("qtPI");

  // Deploy it — this sends a transaction to the network
  const token = await MyToken.deploy(TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY);

  // Wait until the transaction is confirmed on the blockchain
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`\nMyToken deployed successfully!`);
  console.log(`Contract address: ${address}`);
  console.log(`\nVerify on Etherscan: https://sepolia.etherscan.io/address/${address}`);
}

// Hardhat requires this pattern to handle async errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
