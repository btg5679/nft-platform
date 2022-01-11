require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const FROM_ADDRESS = process.env.FROM_ADDRESS;
const TO_ADDRESS = process.env.TO_ADDRESS;
const TOKEN_ID = process.env.TOKEN_ID;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/simpleContract/MyNFT.sol/MyNFT.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function transfer(fromAddress, toAddress, tokenId) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  console.log(nftContract.methods);
  //the transaction
  //   let tx = await nftContract.methods
  //     .transferFrom(toAddress, tokenId)
  //     .send({ from: fromAddress, gas: 500000, gasPrice: 0x00 });
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .transferFrom(fromAddress, toAddress, tokenId)
      .encodeABI(),
  };

  let signedTx;
  let transactionReceipt;
  try {
    signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  } catch (e) {
    console.log(" Promise failed:", err);
  }

  try {
    transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
  } catch (e) {
    console.log("Something went wrong when submitting your transaction:", e);
  }

  console.log(
    "The hash of your transaction is: ",
    transactionReceipt.transactionHash,
    "\nCheck Alchemy's Mempool to view the status of your transaction!"
  );
}

transfer(FROM_ADDRESS, TO_ADDRESS, TOKEN_ID);
