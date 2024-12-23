const { ethers } = require('ethers');
require('dotenv').config(); // Load environment variables from .env
// Define your provider URL
// For Infura, Alchemy, or another Ethereum node provider
const providerUrl = process.env.HEDERA_TESTNET_RPC;
// Alternatively, use Alchemy
// const providerUrl = 'https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY';

// Create a provider instance
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Function to get the latest block number
async function getLatestBlockNumber() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log(`Latest Block Number: ${blockNumber}`);
        return blockNumber;
    } catch (error) {
        console.error('Error fetching block number:', error);
    }
}
module.exports = provider;
