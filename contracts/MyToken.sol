// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev A simple ERC-20 token using OpenZeppelin.
 *      The deployer is the owner and can mint new tokens.
 */
contract MyToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        // Mint the initial supply to the deployer's wallet.
        // initialSupply is in whole tokens — multiply by 10^18 (the smallest unit, like cents)
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    /**
     * @dev Only the owner (deployer) can mint additional tokens.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }
}
