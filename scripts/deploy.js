const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("upload");
  const contract = await Upload.deploy();
  await contract.deployed(); 

  console.log("Address of contract:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0xae9cfDD799790DCCEEaf59811F90fbbA49188b87 = contract deploy address
