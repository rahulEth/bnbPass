// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.0001");

  const lock = await hre.ethers.deployContract("TrustlessProof");
  await lock.waitForDeployment();
  const addr = await lock.getAddress()
  console.log('contract address: ', addr)



  console.log(
    `TrustlessProof with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const verifyContract = async ()=>{
  console.log("Verifying Zkpass...")
  await hre.run("verify:verify", {
    address: '0xc03e265477CE9a2519CaB5e070f4855846AeD620',   //lock.address
  })
}
verifyContract()