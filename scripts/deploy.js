async function main() {
  const Base64Factory = await ethers.getContractFactory(
    "contracts/utils/Base64.sol:Base64"
  );

  const Base64 = await Base64Factory.deploy();

  const RightwayDecoderFactory = await ethers.getContractFactory(
    "contracts/RightwayDecoder.sol:RightwayDecoder"
  );

  const RightwayDecoder = await RightwayDecoderFactory.deploy();

  const RightwayMetadataFactory = await ethers.getContractFactory(
    "contracts/RightwayMetadata.sol:RightwayMetadata",
    {
      libraries: {
        RightwayDecoder: RightwayDecoder.address,
        Base64: Base64.address,
      },
    }
  );

  const RightwayMetadata = await RightwayMetadataFactory.deploy();

  const RightWayTokenFactory = await ethers.getContractFactory(
    "contracts/RightwayToken.sol:RightwayToken",
    {
      libraries: {
        RightwayMetadata: RightwayMetadata.address,
      },
    }
  );

  // Start deployment, returning a promise that resolves to a contract object
  const RightwayToken = await RightWayTokenFactory.deploy(
    "MasterPieces",
    "MPS",
    "Knot&Soul"
  );
  console.log("Full Contract Deployed....");
  console.log("Contract deployed to address:", RightwayToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
