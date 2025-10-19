pragma solidity ^0.4.25;

import "./zombiehelper.sol";
import "./ZombieToken.sol";

contract ZombieAttack is ZombieHelper {

  ZombieToken public zombieToken;

  function setZombieTokenAddress(address _address) external onlyOwner {
    zombieToken = ZombieToken(_address);
  }

  function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
    Zombie storage myZombie = zombies[_zombieId];
    Zombie storage enemyZombie = zombies[_targetId];
    require(_isReady(myZombie));

    uint myLevel = myZombie.level;
    if (myZombie.ability == Ability.FireBreath) {
      myLevel = myLevel.add(1);
    }

    if (myLevel >= enemyZombie.level) {
      myZombie.winCount = myZombie.winCount.add(1);
      
      uint xpGained = 10;
      if (myZombie.ability == Ability.ToxicBite) {
        xpGained = xpGained * 2;
      }
      myZombie.experience = myZombie.experience.add(xpGained);
      
      if (enemyZombie.ability != Ability.Regenerate) {
        enemyZombie.lossCount = enemyZombie.lossCount.add(1);
      }
      
      zombieToken.mint(msg.sender, 10 * (10 ** 18));
      _levelUp(_zombieId);
      feedAndMultiply(_zombieId, enemyZombie.dna);
    } else {
      myZombie.lossCount = myZombie.lossCount.add(1);
      enemyZombie.winCount = enemyZombie.winCount.add(1);
      _triggerCooldown(myZombie);
    }
  }
}