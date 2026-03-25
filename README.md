# MyToken — ERC-20 Smart Contract

A simple, mintable ERC-20 token built with Hardhat and OpenZeppelin, deployable to the Sepolia testnet.

**Token details (defaults):**
- Name: `MyToken`
- Symbol: `MTK`
- Initial supply: 1,000,000 tokens
- Owner can mint additional tokens at any time

---

## Prerequisites

You need three things set up before you can deploy. Do all of these in your browser first.

### 1. MetaMask Wallet

1. Install the [MetaMask browser extension](https://metamask.io)
2. Create a new wallet — write down your seed phrase and store it safely
3. Enable test networks: Settings > Advanced > Show test networks
4. Switch the active network to **Sepolia Test Network**
5. Export your private key: click the three dots next to your account > Account Details > Show Private Key
   - It starts with `0x` followed by 64 characters
   - **Never share this or commit it to git**

### 2. Free Sepolia ETH (for gas fees)

You need a tiny amount of fake ETH to pay for the deployment transaction. It's free.

1. Go to [https://sepoliafaucet.com](https://sepoliafaucet.com) (requires a free Alchemy account — same one you'll create in step 3)
2. Paste your MetaMask wallet address (the `0x...` address shown at the top of MetaMask)
3. Click "Send Me ETH"
4. Wait ~1 minute — you'll see the balance appear in MetaMask

Alternative faucets if the above doesn't work:
- [https://faucet.sepolia.dev](https://faucet.sepolia.dev)
- [https://www.infura.io/faucet/sepolia](https://www.infura.io/faucet/sepolia)

### 3. Alchemy API Key (RPC Provider)

Your computer can't talk to the Sepolia network directly — you need a relay provider.

1. Sign up for a free account at [https://www.alchemy.com](https://www.alchemy.com)
2. Click **Create App**
3. Select: Chain = Ethereum, Network = Ethereum Sepolia
4. Once created, click **API Key** and copy the **HTTPS** endpoint
   - It looks like: `https://eth-sepolia.g.alchemy.com/v2/abcdef123456...`

---

## Project Setup

### Install dependencies

```bash
npm install
```

### Configure your secrets

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your real values:

```
ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY_HERE
PRIVATE_KEY=0xYOUR_64_CHARACTER_PRIVATE_KEY_HERE
```

> **Security:** `.env` is listed in `.gitignore` so it will never be committed to git. Never share these values.

---

## Usage

### Compile the contract

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully
```

### Run the tests

```bash
npx hardhat test
```

Expected output:
```
  MyToken
    ✔ Should have the correct name and symbol
    ✔ Should mint the initial supply to the deployer
    ✔ Should allow the owner to mint additional tokens
    ✔ Should prevent non-owners from minting

  4 passing (Xms)
```

All 4 tests must pass before deploying.

### Deploy to Sepolia

Make sure your `.env` has real values and your wallet has Sepolia ETH, then run:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Expected output (takes 15–60 seconds):
```
Deploying MyToken...
  Name:           MyToken
  Symbol:         MTK
  Initial Supply: 1,000,000 tokens

MyToken deployed successfully!
Contract address: 0xABCDEF1234567890...

Verify on Etherscan: https://sepolia.etherscan.io/address/0xABCDEF1234567890...
```

**Save the contract address** — you'll need it to interact with the token.

---

## Verifying the Deployment

### Option 1: Etherscan

Open the Etherscan link printed after deployment. You'll see:
- The contract creation transaction
- Token name and symbol
- Your wallet's token balance

### Option 2: Import into MetaMask

1. Open MetaMask, make sure you're on Sepolia
2. Click **Import Tokens**
3. Paste your contract address
4. MetaMask auto-detects the name (MyToken) and symbol (MTK)
5. Your 1,000,000 MTK balance appears

### Option 3: Hardhat console

```bash
npx hardhat console --network sepolia
```

Then type these one by one:

```javascript
const Token = await ethers.getContractFactory("MyToken")
const token = await Token.attach("0xYOUR_CONTRACT_ADDRESS_HERE")
await token.name()         // "MyToken"
await token.symbol()       // "MTK"
await token.totalSupply()  // 1000000000000000000000000n  (= 1M tokens × 10^18)
```

Press `Ctrl+C` twice to exit.

---

## Customizing the Token

To change the token name, symbol, or initial supply, edit `scripts/deploy.js`:

```javascript
const TOKEN_NAME     = "MyToken";   // ← change this
const TOKEN_SYMBOL   = "MTK";       // ← change this
const INITIAL_SUPPLY = 1_000_000;   // ← change this (whole tokens, not wei)
```

Then recompile and redeploy.

---

## Project Structure

```
smart-contract/
├── contracts/
│   └── MyToken.sol         ← The ERC-20 token contract (Solidity)
├── scripts/
│   └── deploy.js           ← Deployment script
├── test/
│   └── MyToken.test.js     ← Automated tests
├── hardhat.config.js       ← Hardhat configuration (networks, compiler)
├── .env                    ← Your secrets — never commit this
├── .env.example            ← Template showing what .env needs
└── .gitignore
```

## Tech Stack

- [Hardhat](https://v2.hardhat.org) v2 — Ethereum development framework
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) v5 — Audited ERC-20 base contract
- [ethers.js](https://docs.ethers.org/v6/) v6 — JavaScript library for interacting with Ethereum
- [Chai](https://www.chaijs.com) — Assertion library used in tests
- [dotenv](https://github.com/motdotla/dotenv) — Loads secrets from `.env`
