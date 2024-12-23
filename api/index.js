const fs = require("fs");
const dotenv = require("dotenv");
// const { Provider, Wallet, types } = require('zksync-ethers');
dotenv.config();
const { connectToDatabase } = require("./db.js");
const cors = require("cors");
const {getProof, setProof, uploadToIpfs} = require('./utils/ethers.js');

// index.js

const express = require("express");
const app = express();
const CryptoJS = require("crypto-js");
const corsOptions = require("./config/corsOptions.js");
// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());
// Set the port number to listen on
const PORT = process.env.PORT || 3000;

// Define a simple route
app.post("/api/saveCred", (req, res) => {
  // Encrypt the message with the public key
  const type = req.body.type || "personal";
  if (!req.body.publicKey || !req.body.address || !req.body.appLink) {
    return res
      .status(403)
      .send({ message: "publicKey, address or appLink is missing" });
  }

  if (
    !req.body.encryptedUser ||
    !req.body.encryptedPassword ||
    !req.body.encryptedappLink
  ) {
    return res.status(403).send({
      message:
        "encryptedUser, encryptedPassword or encryptedappLink is missing",
    });
  }
  // const key = publicKeyToAesKey(publicKey);
  // const iv = crypto.randomBytes(16); // Initialization vector
  // const cipherUser = crypto.createCipheriv('aes-256-cbc', key, iv);
  // const cipherPassword = crypto.createCipheriv('aes-256-cbc', key, iv);
  // const cipherApplink = crypto.createCipheriv('aes-256-cbc', key, iv);
  // let encrypted = cipherUser.update(req.body.user, 'utf8', 'hex');
  // let encrypted1 = cipherPassword.update(req.body.password, 'utf8', 'hex');
  // let encrypted2 = cipherApplink.update(req.body.appLink, 'utf8', 'hex');

  // encrypted += cipherUser.final('hex');
  // encrypted1 += cipherPassword.final('hex');
  // encrypted2 += cipherApplink.final('hex');

  // const encryptedUser = iv.toString('hex') + ':' + encrypted;
  // const encryptedPassword = iv.toString('hex') + ':' + encrypted1;
  // const encryptedappLink = iv.toString('hex') + ':' + encrypted2;

  // Encrypt
  // var encryptedUser = CryptoJS.AES.encrypt(req.body.user, req.body.signature).toString();
  // var encryptedPassword = CryptoJS.AES.encrypt(req.body.password, req.body.signature).toString();
  // var encryptedApplink = CryptoJS.AES.encrypt(req.body.appLink, req.body.signature).toString();

  uploadToDe(
    res,
    req.body.publicKey,
    req.body.address,
    req.body.encryptedUser,
    req.body.encryptedPassword,
    req.body.encryptedApplink,
    req.body.appLink,
    type.toLowerCase()
  );
  // const newData = {publicKey, encryptedUser, encryptedPassword, appLink};

  // // Read the existing data from the file
  // fs.readFile('./saveCred.json', 'utf8', (err, data) => {
  //     if (err && err.code !== 'ENOENT') throw err;

  //     const jsonArray = data ? JSON.parse(data) : [];
  //     console.log('jsonA----- ', jsonArray)
  //     // Append the new data
  //     jsonArray.push(newData);

  //     // Write the updated array back to the file
  //     fs.writeFile('./saveCred.json', JSON.stringify(jsonArray, null, 2), (err) => {
  //         if (err) throw err;
  //         console.log('Data appended to file');
  //     });
  // });
  // return res.status(200).send({publicKey, encryptedUser, encryptedPassword, appLink})
});

async function uploadToDe(
  res,
  publicKey,
  address,
  encryptedUser,
  encryptedPassword,
  encryptedappLink,
  appLink,
  type
) {
    const metadata = {
        publicKey,
        address,
        encryptedUser,
        encryptedPassword,
        encryptedappLink,
        type,
      }
  const resp = await uploadToIpfs(metadata)
  console.log(resp.cid);
  // return;
  storeToDB(
    publicKey,
    address,
    resp.cid,
    encryptedUser,
    encryptedPassword,
    appLink,
    type
  );

  return res.status(200).send({
    address,
    encryptedUser,
    encryptedPassword,
    appLink,
    ipfsHash: resp.cid,
    type,
  });
}
async function storeToDB(
  publicKey,
  address,
  ipfsHash,
  encryptedUser,
  encryptedPassword,
  appLink,
  type
) {
  const resp = await setProof(publicKey, address, ipfsHash);
  const txHash = `https://testnet.bscscan.com/testnet/transaction/${resp.transactionId}`
  const db = await connectToDatabase();
  const collection = db.collection("bnb-pass");
  const result = await collection.insertOne({
    publicKey,
    address,
    ipfsHash,
    encryptedUser,
    encryptedPassword,
    appLink,
    type,
    txHash
  });
  console.log("document inserted Id ", result.insertedId.toString());
}
app.get("/api/getEncryptedCred", async (req, res) => {
  // console.log("req.query.appLink ------ ", req.query.appLink, req.query.address)
  if (!req.query.appLink || !req.query.address) {
    return res.status(403).send({ message: "appLink or address is missing" });
  }
  const db = await connectToDatabase();
  const collection = db.collection("bnb-pass");
  try {
    const result = await collection.findOne({
      appLink: req.query.appLink,
      address: req.query.address,
    });
    if (result) {
      return res.status(200).send(result);
    }
    return res.status(404).send({ message: "no matching credentials found" });
  } catch (err) {
    console.log("internal server err ", err);
    return res.status(500).send({ message: "internal server error" });
  }
});

app.get("/api/getEncryptedCredsByType", async (req, res) => {
  // console.log("req.query.appLink ------ ", req.query.appLink, req.query.address)
  if (!req.query.type || !req.query.address) {
    return res.status(403).send({ message: "type or address is missing" });
  }
  const db = await connectToDatabase();
  const collection = db.collection("bnb-pass");
  let query = {};
  if(req.query.type.toLowerCase() == 'all'){
    query = {
      address: req.query.address,
    }
  }else if(req.query.type == 'personal' || req.query.type == 'social' || req.query.type == 'banking' || req.query.type == 'other'){
    query = {
      type: req.query.type,
      address: req.query.address,
    }
  }else{
    return res.status(403).send({ message: "valid type are personal, social, banking, other, all" });
  }
  try {
    const result = await collection.find(query);
    if (result) {
      const finalResult = await result.toArray();
      JSON.stringify(finalResult, null, 2);
      return res.status(200).send(finalResult);
    }
    return res.status(404).send({ message: "no matching credentials found" });
  } catch (err) {
    console.log("internal server err ", err);
    return res.status(500).send({ message: "internal server error" });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
