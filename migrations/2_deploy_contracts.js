const CryptoZombies = artifacts.require("./CryptoZombies.sol");
const Marketplace = artifacts.require("./marketplace.sol");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoZombies);
  await deployer.deploy(Marketplace, CryptoZombies.address);
};