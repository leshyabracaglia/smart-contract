// Automated tests for MyToken.
// Run with: npx hardhat test
// Hardhat spins up a temporary local blockchain just for testing — no real ETH needed.

const { expect } = require("chai");
const { ethers }  = require("hardhat");

describe("MyToken", function () {
  let token;
  let owner;
  let otherAccount;

  // beforeEach runs before every test — deploys a fresh contract each time
  // so tests never interfere with each other
  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy("MyToken", "MTK", 1_000_000);
    await token.waitForDeployment();
  });

  it("Should have the correct name and symbol", async function () {
    expect(await token.name()).to.equal("MyToken");
    expect(await token.symbol()).to.equal("MTK");
  });

  it("Should mint the initial supply to the deployer", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    const totalSupply  = await token.totalSupply();

    // The deployer should own 100% of the initial supply
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Should allow the owner to mint additional tokens", async function () {
    const mintAmount = 500n; // 500 tokens (BigInt notation required in ethers v6)

    await token.mint(otherAccount.address, mintAmount);

    const decimals = await token.decimals();
    const expected = mintAmount * (10n ** decimals);

    expect(await token.balanceOf(otherAccount.address)).to.equal(expected);
  });

  it("Should prevent non-owners from minting", async function () {
    // Calling mint as otherAccount (not the owner) should revert (fail/throw)
    await expect(
      token.connect(otherAccount).mint(otherAccount.address, 100n)
    ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });
});
