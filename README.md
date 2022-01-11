# Overall Infrastructure pulled from this tutorial

https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/

# Infra

Alchemy - dev platform for communicating with Eth blockchain
Hardhat - dev environment that handles compiling, deploying and debugging your application
Ether.js - node lib for interacting with ETH
Alchemy - Web3 library
IPFS - decentralized file distribution to hold nft metadata

## This project contains 2 contracts a simple contact(just minting) and a full nft drop contract that facilitates things like setting royalties, programatically loading tokens and metadata via api, minting single and batch and much more. Because of this there are 2 sets of deploy and mint scripts. deploy and deploySimple, mint and mintSimple

# Steps

## Compile our contract

npx hardhat compile

## Deploy our contract

npx hardhat run scripts/(deploy.js | deploySimple.js) --network ropsten
view contract here - https://ropsten.etherscan.io/

## Populate your .env file accordingly - follow tutorial at top

API_URL="https://eth-ropsten.xxxxxxx"
PRIVATE_KEY="34b91xxxxxx"
PUBLIC_KEY="0xE3xxxxxx"
CONTRACT_ADDRESS="0x469C8e8xxxx"

## Create your NFT - make sure your contract is fully deployed first - and that the drop is sealed

### add images and metadata to ipgs pinata/ipfs

- follow these steps and put your nft metadata in in the root metadata folder according to the sample files inclided in this project

### mint :)

node scripts/(mint.js | mintSimple.js)

Steps for interacting with the Contract:
mint() and mintBatch() - used to mint a single token or a batch of tokens

## General dev steps once up and running

npx hardhat compile
npx hardhat run scripts/(deploy.js | deploySimple.js) --network ropsten - add contract address from logs to .env
node scripts/(mint.js | mintSimple.js) - don't forget to wait for the contract to completely deploy in prev step(...transactionHash of undefined...)
