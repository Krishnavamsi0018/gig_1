const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const GigPassport = await ethers.getContractFactory("GigPassport");
  const passport = await GigPassport.deploy();
  await passport.waitForDeployment();
  console.log("GigPassport:", await passport.getAddress());

  const GigNFT = await ethers.getContractFactory("GigNFT");
  const nft = await GigNFT.deploy();
  await nft.waitForDeployment();
  console.log("GigNFT:", await nft.getAddress());

  console.log("\nAdd to frontend/.env:");
  console.log("VITE_CONTRACT_PASSPORT=" + await passport.getAddress());
  console.log("VITE_CONTRACT_NFT=" + await nft.getAddress());
}

main().catch(console.error);
