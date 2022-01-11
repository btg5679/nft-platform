require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/RightwayToken.sol/RightwayToken.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function setDropRoyalties(royaltyBps) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .setDropRoyalties(PUBLIC_KEY, royaltyBps)
      .encodeABI(),
  };

  let signedTx;
  let transactionReceipt;
  try {
    signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  } catch (e) {
    console.log(" Promise failed:", e);
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
// ex. 250 = 2.5%
setDropRoyalties(250);
