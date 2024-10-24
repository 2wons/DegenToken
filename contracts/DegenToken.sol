// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {

    mapping(address => string[]) ownedItems;
    
    event TokenRedeemed(address buyer, uint256 amount, string item_id);

    constructor() ERC20("Degen", "DGN") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() override public pure returns (uint8) {
        return 0;
    }

    // Burn tokens, anyone can burn their own tokens
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function redeem(string memory item_id, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);

        ownedItems[msg.sender].push(item_id);
        
        emit TokenRedeemed(msg.sender, amount, item_id);
    }

    function getOwnedItems() public view returns (string[] memory) {
        return ownedItems[msg.sender];
    }

    function getBalance() external view returns (uint256) {
        return this.balanceOf(msg.sender);
    }
}
