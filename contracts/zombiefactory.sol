pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract ZombieFactory is Ownable {

  using SafeMath for uint256;

  modifier onlyOwnerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    _;
  }

  event NewZombie(uint zombieId, string name, uint dna);

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 1 seconds;

  enum Ability { None, FireBreath, ToxicBite, Regenerate }

  struct Zombie {
    string name;
    uint dna;
    uint level;
    uint experience;
    uint winCount;
    uint lossCount;
    uint32 readyTime;
    Ability ability;
  }

  Zombie[] public zombies;

  mapping (uint => address) public zombieToOwner;
  mapping (address => uint) ownerZombieCount;

  function _createZombie(string _name, uint _dna) internal {
    Ability _ability = Ability(uint(_dna) % 4);
    uint id = zombies.push(Zombie(_name, _dna, 1, 0, 0, 0, uint32(now + cooldownTime), _ability)) - 1;
    zombieToOwner[id] = msg.sender;
    ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1);
    emit NewZombie(id, _name, _dna);
  }

  function _generateRandomDna(string _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomZombie(string _name) public {
    /* require(ownerZombieCount[msg.sender] == 0); */
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createZombie(_name, randDna);
  }

}