const ethers = require('ethers');
require('dotenv').config();


const getProof = async (key, hash)=>{
    const gasLimit = 1000000;
    const ipfsHash = hash;
    try {
        // const encodedPacked = ethers.utils.solidityPack(
        //     ["string", "string"],[key, ipfsHash]);
        
        // // Keccak256 hashing
        // const hash = ethers.utils.keccak256(encodedPacked).slice(2);

        // const query = new ContractCallQuery()
        //     .setContractId(contractId)
        //     .setFunction('getProof', new ContractFunctionParameters().addBytes32(Buffer.from(hash, 'hex')))
        //     .setGas(gasLimit)
        //     .setMaxQueryPayment(new Hbar(5)) 
        //     .setSenderAccountId(myAccountId)

        // //Sign with the client operator private key to pay for the query and submit the query to a Hedera network
        // const contractCallResult = await query.execute(client);

        // const owner = contractCallResult.getAddress(0);
        // const publicKey = contractCallResult.getString(1);
        // const dataHash = contractCallResult.getString(2);
        // const timestamp = contractCallResult.getUint256(3);
        
        // console.log('Owner:', owner);
        // console.log('Public Key:', publicKey);
        // console.log('Data Hash:', dataHash);
        // console.log('Timestamp:', timestamp);

    } catch (error) {
        console.error('Error calling contract function:', error);
    }
}


const setProof =async (publicKey, ownerAdd, ipfsHash)=>{
    // const contractInterface = new ethers.utils.Interface(contractABI);
    const gasLimit = 1000000;
    let transactionId= null;
    try {
        // const transaction = new ContractExecuteTransaction()
        // .setContractId(contractId)
        // .setGas(gasLimit)
        // .setFunction("storeProof", 
        //     new ContractFunctionParameters().addString(publicKey).addAddress(ownerAdd).addString(ipfsHash)
        // )

        // //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
        // const txResponse = await transaction.execute(client);

        // //Request the receipt of the transaction
        // // const receipt = await txResponse.getReceipt(client);

        // // Get the transactionId from the response object
        // transactionId = txResponse.transactionId.toString();
        // console.log("Transaction ID:", transactionId);
        //     const receipt = await txResponse.getReceipt(client); // Adjust based on your function return type
        //     console.log('Contract function result:', receipt);
        //     //Get the transaction consensus status
        //     const transactionStatus = receipt.status;
        
        //    console.log("The transaction consensus status is " +transactionStatus);
        // return {transactionId, ownerAdd}
    } catch (error) {
        console.error('Error calling contract function:', error);
        return {transactionId, ownerAdd}
    }
}



async function checkBalance() {

    const provider = new LocalProvider({
      network: Client.forTestnet()
    });

    const wallet = new Wallet(
        operatorId,
        operatorKey,
        client
    );

    try {
        const balance = await new AccountBalanceQuery()
            .setAccountId(wallet.getAccountId())
            .executeWithSigner(wallet);

        console.log(
            `${wallet
                .getAccountId()
                .toString()} balance = ${balance.hbars.toString()}`,
        );
    } catch (error) {
        console.error('get balance errror----- ',error);
    }

    // try {
    //     const balance = await client.getAccountBalance(myAccountId);
    //     console.log('Account balance:', balance.toString());
    // } catch (error) {
    //     console.error('Error getting account balance:', error);
    // }
}

async function verifyClient() {
    try {
        // Check if operator account is set
        if (!operatorId || !operatorKey) {
            throw new Error('Operator ID or Key is not set.');
        }

        // Create and execute an AccountBalanceQuery
        const query = new AccountBalanceQuery()
        .setAccountId(operatorId);

        const balance = await query.execute(client);
        console.log(`Account balance: ${balance.hbars.toString()} HBAR`);

        // Optional: Fetch and print node information to ensure client is connected
        const nodeInfo = await client.getNetwork();
        console.log('Network Information:', nodeInfo);

        // Additional checks (e.g., querying transaction status) can be added here

    } catch (error) {
        console.error('Error verifying client:', error);
    }
}
module.exports={getProof, setProof}