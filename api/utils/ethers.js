const ethers = require('ethers');
require('dotenv').config();

const ABI = require('./ABI');

const getProof = async (key, hash)=>{
    try {
       // Connect to the Ethereum network
       const provider = new ethers.providers.JsonRpcProvider(process.env.BNB_RPC);

       // Create a wallet instance
       const wallet = new ethers.Wallet(process.env.APP_PRIVATE_KEY, provider);

       // Convert the amount to the correct format (ensure correct decimals)
       const bnbPassContract = new ethers.Contract(process.env.CONTRACT_ADDR, ABI, wallet);

       // Send the transaction
       const result = await bnbPassContract.getProof(key, hash);
   } catch (err) {
       console.error(err.message);
       return res.status(500).json({ 
         status: "error",
         message: "Internal server error",
         error: {
           code: "INTERNAL_SERVER_ERROR",
           details: err.message
         }
       });
     }
}


const setProof =async (publicKey, ownerAdd, ipfsHash)=>{
    // const gasLimit = 1000000;
    let transactionId= null;
    try {
       // Connect to the Ethereum network
       const provider = new ethers.providers.JsonRpcProvider(process.env.BNB_RPC);

       // Create a wallet instance
       const wallet = new ethers.Wallet(process.env.APP_PRIVATE_KEY, provider);

       // Convert the amount to the correct format (ensure correct decimals)
       const bnbPassContract = new ethers.Contract(process.env.CONTRACT_ADDR, ABI, wallet);

       // Send the transaction
       const tx = await bnbPassContract.storeProof(publicKey, ownerAdd, ipfsHash);
       
       console.log("Transaction hash:", tx.hash);
       const transactionId = tx.hash;

       return {transactionId, ownerAdd}

    } catch (error) {
        console.error('Error calling contract function:', error);
        return {transactionId, ownerAdd}
    }
}


setProof("0x290ABcfdbB5046EDeDC589eFef2BB2EfAfc6b6ca", "0x290ABcfdbB5046EDeDC589eFef2BB2EfAfc6b6ca", "ipfs:0x122344449")


module.exports={getProof, setProof}