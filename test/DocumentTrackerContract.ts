import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { expect } from 'chai';
import { DocumentTrackerContract } from "../typechain-types";
import { getHashContentOfFile } from "./utils";
import { extendEnvironment } from "hardhat/config";

context(`DocumentTrackerContract`, async () => {
    let documentTracker: DocumentTrackerContract;
    let admin: SignerWithAddress, account1: SignerWithAddress;

    beforeEach(async () => {
        [admin, account1] = await ethers.getSigners();
        const DocumentTrackerContract = await ethers.getContractFactory("DocumentTrackerContract", admin);
        documentTracker = await upgrades.deployProxy(DocumentTrackerContract, []) as DocumentTrackerContract;
        await documentTracker.deployed();
    })

    it(`Deploy success`, async () => {
        expect(documentTracker.address).to.be.properAddress;
    })

    it(`Mint new content file`, async () => {
        const hashFileA = getHashContentOfFile('fileA.txt');
        await documentTracker.connect(account1).mint(hashFileA);
        const balanceOfAccount1 = await documentTracker.balanceOf(account1.address);
        expect(balanceOfAccount1).to.be.equal(1);

        const hashIndex = await documentTracker.contentIndex(hashFileA);
        expect(hashIndex.isExist).to.be.equal(true);
        expect(hashIndex.tokenId).to.be.equal(0);

        const trackerContent = await documentTracker.trackers(0);
        expect(trackerContent.hashContent).to.be.equal(hashFileA);
        expect(trackerContent.orgOwner).to.be.equal(account1.address);
    })
})