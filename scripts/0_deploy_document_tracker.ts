import hre, { ethers, network, upgrades } from "hardhat";
import { saveContract, sleep } from "../test/utils";

(async function main() {
    console.log(`Start deploying DocumentTracker contract`);
    const networkName = network.name;
    const DocumentTrackerContract = await ethers.getContractFactory('DocumentTrackerContract');
    const documentTracker = await upgrades.deployProxy(DocumentTrackerContract, []);
    await documentTracker.deployed();

    console.log(`Deploy DocumentTrackerContract success at address ${documentTracker.address}`);

    await saveContract(networkName, "DocumentTracker", documentTracker.address);
    console.log(`Saved contract address`);

    console.log(`Sleep 60 seconds for confirmation`);
    await sleep(60000);

    console.log(`Start verifying contract`);
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(documentTracker.address);

    await hre.run('verify:verify', {
        address: implementationAddress,
    });
    console.log(`Verify success`);
})()