# qtPI — ERC-20 Smart Contract

A mintable ERC-20 token built with Hardhat and OpenZeppelin, deployed to the Sepolia testnet.

**Token details:**
- Name: `qtPI`
- Symbol: `QTPI`
- Initial supply: 1,000,000 tokens
- Owner can mint additional tokens at any time
- Deployed contract: `0xcfB8035a88DE1b5fdc89242169c8c2f62c1656EE`

---

## How it works

### What is an ERC-20 token?

An ERC-20 token is a smart contract — a program that lives permanently on the Ethereum blockchain. It keeps track of who owns how many tokens, and lets people transfer them to each other. ERC-20 is just a standard set of rules that all tokens follow so wallets and exchanges know how to work with them.

### What this contract does

`contracts/qtPI.sol` defines the QTPI token. It does three things:

1. **Creates the token** — when deployed, it sets the name, symbol, and mints the initial supply directly to the deployer's wallet
2. **Allows transfers** — any holder can send QTPI to any Ethereum address (this is built into OpenZeppelin's ERC-20 base)
3. **Allows minting** — only the owner (whoever deployed the contract) can create new tokens and send them to any address

### What OpenZeppelin is

OpenZeppelin is a library of pre-written, security-audited smart contracts. Rather than writing ERC-20 logic from scratch (which is easy to get wrong), this contract inherits from `ERC20.sol` and `Ownable.sol` — getting transfer logic and ownership controls for free.

### What Hardhat is

Hardhat is the development framework used to compile, test, and deploy the contract. Think of it like npm/webpack but for Ethereum smart contracts.

---

## Prerequisites

You need three things set up before you can deploy.

### 1. MetaMask Wallet

1. Install the [MetaMask browser extension](https://metamask.io)
2. Create a new wallet — write down your seed phrase and store it safely
3. Enable test networks: Settings > Advanced > Show test networks
4. Switch the active network to **Sepolia Test Network**
5. Export your private key: click the three dots next to your account > Account Details > Show Private Key
   - **Never share this or commit it to git**

### 2. Free Sepolia ETH (for gas fees)

You need a tiny amount of fake ETH to pay for the deployment transaction. It's free.

- [Google faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) — easiest, just requires a Google account
- [Alchemy faucet](https://sepoliafaucet.com)
- [Infura faucet](https://www.infura.io/faucet/sepolia)

### 3. Alchemy API Key

Your computer can't talk to the Sepolia network directly — you need a relay provider.

1. Sign up free at [alchemy.com](https://alchemy.com)
2. Create an app → Chain: Ethereum, Network: Sepolia
3. Copy the HTTPS endpoint — looks like `https://eth-sepolia.g.alchemy.com/v2/abc123...`

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

Open `.env` and fill in your values:

```
ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY_HERE
PRIVATE_KEY=0xYOUR_64_CHARACTER_PRIVATE_KEY_HERE
```

> `.env` is in `.gitignore` and will never be committed. Never share these values.

---

## Usage

### Compile

```bash
npx hardhat compile
```

### Test

```bash
npx hardhat test
```

### Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Save the contract address printed in the output.

### Verify on Etherscan

```bash
npx hardhat verify --contract contracts/qtPI.sol:qtPI --network sepolia YOUR_CONTRACT_ADDRESS "qtPI" "QTPI" 1000000
```

### Import token into MetaMask

1. Open MetaMask on Sepolia
2. Click **Import Tokens**
3. Paste the contract address
4. MetaMask auto-detects the name and symbol

---

## Project Structure

```
smart-contract/
├── contracts/
│   └── qtPI.sol            ← The ERC-20 token contract (Solidity)
├── scripts/
│   └── deploy.js           ← Deployment script
├── test/
│   └── MyToken.test.js     ← Automated tests
├── hardhat.config.js       ← Hardhat configuration
├── .env                    ← Your secrets — never commit this
├── .env.example            ← Template showing what .env needs
└── .gitignore
```

## Tech Stack

- [Hardhat](https://v2.hardhat.org) v2 — Ethereum development framework
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) v5 — Audited ERC-20 base contract
- [ethers.js](https://docs.ethers.org/v6/) v6 — JavaScript library for interacting with Ethereum
- [dotenv](https://github.com/motdotla/dotenv) — Loads secrets from `.env`
