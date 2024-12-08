require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

// https://base-mainnet.g.alchemy.com/v2/9Gt8lpwu_WelXSIE83OLYtiB0Smb3CWS
// sapolia
const META_MASK_PRIVATE_KEY= process.env.META_MASK_PRIVATE_KEY;
console.log('META_MASK_PRIVATE_KEY------- ', META_MASK_PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[
      {
        version: "0.8.0"
      },
      {
        version: "0.8.13"
      },
      {
        version: "0.8.22"
      }
    ]
  },
  etherscan: {
    apiKey: {
      bscTestnet: '763YK4NDSIHQY1WIYAI8PH29PXUDTTVAX5'
    }
  },
  networks:{
    localhost:{
      url: 'http://127.0.0.1:8545'
    },
    bscTestnet:{
      // url: `https://base-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      url : `https://bsc-testnet-rpc.publicnode.com`, // 97, tBNB
      accounts: [META_MASK_PRIVATE_KEY] ,
    },

  }
};