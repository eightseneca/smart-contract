// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract DocumentTrackerContract is AccessControlUpgradeable, ERC721Upgradeable, ERC721EnumerableUpgradeable {
    struct DocumentTracker {
        bytes32 hashContent;
        address orgOwner;
    }

    struct HashContentIndex {
        bool isExist;
        uint256 tokenId;
    }

    DocumentTracker[] public trackers;
    uint256 public trackerCount;
    mapping(bytes32 => HashContentIndex) public contentIndex;

    function initialize() public initializer {
        __ERC721_init("DocumentTracker", "DOT");
        __ERC721Enumerable_init();
        __AccessControl_init();

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(bytes32 hashContent) public {
        HashContentIndex memory index = contentIndex[hashContent];
        require(!index.isExist, "Content already uploaded");
        trackers.push(DocumentTracker(hashContent, msg.sender));
        contentIndex[hashContent] = HashContentIndex(true, trackerCount);
        _mint(msg.sender, trackerCount);
        ++trackerCount;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(
            ERC721Upgradeable,
            ERC721EnumerableUpgradeable,
            AccessControlUpgradeable
        ) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override (
            ERC721Upgradeable,
            ERC721EnumerableUpgradeable
        )
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
