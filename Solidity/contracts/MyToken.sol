// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Burnable.sol";
import "./Ownable.sol";

contract MyToken is ERC721, ERC721Burnable, Ownable {

    uint256 tokenId = 0;

    constructor() ERC721("MyToken", "MTK") {}

    function safeMint(address to) public onlyOwner {
        _safeMint(to, tokenId);
        tokenId += 1;
    }

    function airDrop() public onlyOwner {
        _mint(msg.sender, tokenId);
        tokenId += 1;
    }
}