pragma solidity ^0.4.25;

import "./ownable.sol";
import "./zombieownership.sol";

contract Marketplace is Ownable {

    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(uint256 => Listing) public listings;

    ZombieOwnership public zombieContract;

    constructor(address _zombieContractAddress) public {
        zombieContract = ZombieOwnership(_zombieContractAddress);
    }

    function listItem(uint256 _tokenId, uint256 _price) external {
        require(zombieContract.ownerOf(_tokenId) == msg.sender, "You are not the owner of this zombie.");
        require(_price > 0, "Price must be greater than 0.");

        listings[_tokenId] = Listing(msg.sender, _price);
    }

    function buyItem(uint256 _tokenId) external payable {
        Listing memory listing = listings[_tokenId];
        require(listing.price > 0, "This item is not for sale.");
        require(msg.value == listing.price, "Incorrect price.");

        address seller = listing.seller;
        delete listings[_tokenId];

        seller.transfer(msg.value);
        zombieContract.transferFrom(seller, msg.sender, _tokenId);
    }

    function cancelListing(uint256 _tokenId) external {
        Listing memory listing = listings[_tokenId];
        require(listing.seller == msg.sender, "You are not the seller of this item.");

        delete listings[_tokenId];
    }
}
