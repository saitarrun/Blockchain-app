const SafeMath = artifacts.require("./safemath.sol");
const ZombieFactory = artifacts.require("./zombiefactory.sol");
const ZombieFeeding = artifacts.require("./zombiefeeding.sol");
const ZombieHelper = artifacts.require("./zombiehelper.sol");
const ZombieAttack = artifacts.require("./zombieattack.sol");
const ZombieOwnership = artifacts.require("./zombieownership.sol");
const Marketplace = artifacts.require("./marketplace.sol");

module.exports = async function(deployer) {
  await deployer.deploy(SafeMath);
  await deployer.link(SafeMath, [ZombieFactory, ZombieFeeding, ZombieHelper, ZombieAttack, ZombieOwnership]);
  await deployer.deploy(ZombieFactory);
  await deployer.deploy(ZombieFeeding);
  await deployer.deploy(ZombieHelper);
  await deployer.deploy(ZombieAttack);
  const zombieOwnership = await deployer.deploy(ZombieOwnership);
  await deployer.deploy(Marketplace, zombieOwnership.address);
};