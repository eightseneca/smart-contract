import fs from "fs";
import { ethers } from "hardhat";
import path from "path";

export function getHashContentOfFile(fileName: string): string {
    const content = fs.readFileSync(path.join(__dirname, './resources', fileName), 'utf8');
    return ethers.utils.keccak256(Buffer.from(content));
}