import fs from "fs";
import { ethers } from "hardhat";
import path from "path";

export function getHashContentOfFile(fileName: string): string {
    const content = fs.readFileSync(path.join('./resources', fileName), 'binary');
    return ethers.utils.keccak256(content);
}