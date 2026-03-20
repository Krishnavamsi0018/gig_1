// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GigNFT is ERC721, Ownable {
    enum BadgeType { BRONZE_WORKER, SILVER_WORKER, GOLD_WORKER, EPF_ELIGIBLE, ESI_ELIGIBLE, SLUMP_SURVIVOR }

    struct Badge {
        BadgeType badgeType;
        string name;
        uint256 earnedAt;
    }

    mapping(uint256 => Badge) public badges;
    mapping(address => uint256[]) public workerBadges;
    uint256 private _tokenIdCounter;

    event BadgeMinted(address indexed worker, uint256 tokenId, BadgeType badgeType);

    constructor() ERC721("GigSecure Badge", "GSEC") Ownable(msg.sender) {}

    function mintBadge(address _worker, BadgeType _type, string memory _name) external onlyOwner {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(_worker, tokenId);
        badges[tokenId] = Badge(_type, _name, block.timestamp);
        workerBadges[_worker].push(tokenId);
        emit BadgeMinted(_worker, tokenId, _type);
    }

    function transferFrom(address, address, uint256) public pure override {
        revert("Soulbound: cannot transfer");
    }

    function getWorkerBadges(address _worker) external view returns (uint256[] memory) {
        return workerBadges[_worker];
    }
}
