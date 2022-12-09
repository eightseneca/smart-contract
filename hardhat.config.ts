import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY || '';
const bscTestUrl = process.env.BSCTEST_URL || '';
const bscTestKey = process.env.BSCTEST_API || '';

const config: HardhatUserConfig = {
  solidity: "0.8.12",
  networks: {
    bsc_test: {
      url: bscTestUrl,
      accounts: [privateKey],
      chainId: 97,
    }
  },
  etherscan: {
    apiKey: bscTestKey,
  }
};

export default config;
