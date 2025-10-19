const CryptoZombies = artifacts.require("./CryptoZombies.sol");
const Marketplace = artifacts.require("./marketplace.sol");
const ZombieToken = artifacts.require("./ZombieToken.sol");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoZombies);
  const cryptoZombies = await CryptoZombies.deployed();

  await deployer.deploy(Marketplace, cryptoZombies.address);

  await deployer.deploy(ZombieToken);
  const zombieToken = await ZombieToken.deployed();

  await cryptoZombies.setZombieTokenAddress(zombieToken.address);
  await zombieToken.transferOwnership(cryptoZombies.address);
};