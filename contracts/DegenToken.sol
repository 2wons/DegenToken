// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    struct Item {
        string id;
        string name;
        uint256 price;
    }

    mapping(address => string[]) ownedItems;

    mapping(string => Item) shop;

    event TokenRedeemed(address buyer, uint256 amount, string item_id);

    constructor() ERC20("Degen", "DGN") {
        // initialize shop items
        shop["sea-salt"] = Item("sea-salt", "Sea Salt", 500);
        shop["rosewood"] = Item("rosewood", "Rosewood", 350);
        shop["kang-white"] = Item("kang-white", "Kang White", 100);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    // Burn tokens, anyone can burn their own tokens
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function redeem(string memory item_id) public {
        Item memory item = shop[item_id];

        // Check if the item exists in the shop
        require(bytes(item.id).length != 0, "Item does not exist in the shop");

        // Check if the user has enough balance to redeem the item
        require(balanceOf(msg.sender) >= item.price, "Insufficient balance");

        // Burn tokens as payment for the item
        _burn(msg.sender, item.price);

        // Add the item to the user's owned items
        ownedItems[msg.sender].push(item.id);

        emit TokenRedeemed(msg.sender, item.price, item.id);
    }

    function getOwnedItems() public view returns (string[] memory) {
        return ownedItems[msg.sender];
    }

    function getBalance() external view returns (uint256) {
        return this.balanceOf(msg.sender);
    }

    function getShop() public view returns (Item[] memory) {
        Item[] memory items = new Item[](3);
        items[0] = shop["sea-salt"];
        items[1] = shop["rosewood"];
        items[2] = shop["kang-white"];
        return items;
    }
}
