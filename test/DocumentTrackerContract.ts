import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { expect } from 'chai';
import { DocumentTrackerContract } from "../typechain-types";

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
})