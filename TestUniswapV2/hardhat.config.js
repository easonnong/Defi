require("@nomicfoundation/hardhat-toolbox")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("hardhat-deploy")
require("./tasks")
require("dotenv").config()
require("ganache")
//require("@nomiclabs/hardhat-ganache")

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const Ganache_Deployer_Private_key = process.env.Ganache_Deployer_Private_key

const MNEMONIC = process.env.MNEMONIC || "Your mnemonic"
const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

// VPN
// yarn add undici
// const { setGlobalDispatcher, ProxyAgent } = require("undici")
// const proxyAgent = new ProxyAgent("http://127.0.0.1:19180")
// setGlobalDispatcher(proxyAgent)

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      hardfork: "merge",
      forking: {
        url: MAINNET_RPC_URL,
        //blockNumber: FORKING_BLOCK_NUMBER,
        httpHeaders: {
          Authorization: `Bearer ${process.env.ETHERSCAN_API_KEY}`,
        },
        enabled: false,
      },
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      //gasPrice: 30000000000,
      accounts: Ganache_Deployer_Private_key !== undefined ? [Ganache_Deployer_Private_key] : [],
      //allowUnlimitedContractSize: true,
      saveDeployments: false,
      chainId: 1337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 1,
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
    },
    customChains: [],
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  contractSizer: {
    runOnCompile: false,
    only: [],
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    feeCollector: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  mocha: {
    timeout: 20000000, // 20000 seconds max for running tests
  },
}
