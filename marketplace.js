let web3, userAccount, marketplaceContract, cryptoZombies;

async function init() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }
  web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  userAccount = accounts[0];

  const netId = await web3.eth.net.getId();

  const cryptoZombiesArtifact = await fetch("build/contracts/CryptoZombies.json").then((r) => r.json());
  const cryptoZombiesAddress = cryptoZombiesArtifact.networks[netId].address;
  cryptoZombies = new web3.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);

  const marketplaceArtifact = await fetch("build/contracts/Marketplace.json").then((r) => r.json());
  const marketplaceAddress = marketplaceArtifact.networks[netId].address;
  marketplaceContract = new web3.eth.Contract(marketplaceABI, marketplaceAddress);

  bindUI();
  loadListings();
}

function bindUI() {
  $("#btnList").on("click", listZombie);
}

async function listZombie() {
  const zombieId = $("#listZombieId").val();
  const price = $("#listPrice").val();

  if (zombieId === "" || price === "") {
    alert("Please enter a Zombie ID and a price.");
    return;
  }

  const priceInWei = web3.utils.toWei(price, "ether");

  try {
    // Approve the marketplace to transfer the zombie
    await cryptoZombies.methods.approve(marketplaceContract.options.address, zombieId).send({ from: userAccount, gas: "100000" });
    // List the zombie in the marketplace
    await marketplaceContract.methods.listItem(zombieId, priceInWei).send({ from: userAccount, gas: "200000" });
    alert("Zombie listed for sale!");
    loadListings();
  } catch (e) {
    console.error(e);
    alert("Error listing zombie: " + e.message);
  }
}

async function buyZombie(zombieId, price) {
    try {
        await marketplaceContract.methods.buyItem(zombieId).send({ from: userAccount, value: price, gas: "500000" });
        alert("Zombie purchased!");
        loadListings();
    } catch (e) {
        console.error(e);
        alert("Error buying zombie: " + e.message);
    }
}

async function loadListings() {
  const grid = $("#marketplaceGrid").empty();
  const allZombies = await cryptoZombies.methods.getAllZombies().call();

  for (const zombieId of allZombies) {
    const listing = await marketplaceContract.methods.listings(zombieId).call();
    if (listing.price > 0) {
      const zombie = await cryptoZombies.methods.zombies(zombieId).call();
      const card = $(`
        <div class="zcard">
          <div class="zmedia">
            <img src="${animatedZombieUrl(zombieId)}" alt="Zombie ${zombieId}">
          </div>
          <div class="zbody">
            <div class="ztitle">
              <div>#${zombieId} · ${escapeHtml(zombie.name)}</div>
              <span class="zsub">DNA ${zombie.dna}</span>
            </div>
            <div class="zstats">
              <div class="stat">Lvl<br><b>${zombie.level}</b></div>
              <div class="stat">Wins<br><b>${zombie.winCount}</b></div>
              <div class="stat">Losses<br><b>${zombie.lossCount}</b></div>
            </div>
            <div class="zsub">Price: ${web3.utils.fromWei(listing.price, "ether")} ETH</div>
            <div class="actions">
              <button class="btn btn-sm btn-accent" onclick="buyZombie(${zombieId}, '${listing.price}')">Buy</button>
            </div>
          </div>
        </div>
      `);
      grid.append(card);
    }
  }
}

function animatedZombieUrl(id){
    const ZOMBIE_IMAGES = [
        "images/cartoon-blue-zombie-head-vector-26684274.avif",
        "images/cartoon-zombie-graveyard-vector-790116.avif",
        "images/cartoon-zombie-head-vector-21359926.avif",
        "images/cartoon-zombie-head-vector-22609051.avif",
        "images/cartoon-zombie-vector-2138255.avif",
        "images/cartoon-zombie-vector-22441529.avif",
        "images/cute-zombie-cartoon-vector-1693430.avif",
        "images/green-goblin-monster-vector-134349.avif",
        "images/melting-skull-smiley-horror-cartoon-vector-46480203.avif",
        "images/scary-zombie-face-cartoon-vector-26805326.avif",
        "images/spooky-halloween-zombie-cartoon-vector-1585348.avif",
        "images/zombie-cartoon-set-halloween-theme-vector-6015006.avif",
        "images/zombie-christmas-cartoon-vector-49483160.avif",
        "images/zombie-dance-halloween-vector-27489333.avif",
        "images/zombie-halloween-cartoon-vector-27138078.avif",
        "images/zombie-mascot-logo-vector-26837403.avif",
        "images/zombie-office-workers-cartoon-vector-27289340.avif"
      ];
    return ZOMBIE_IMAGES.length ? ZOMBIE_IMAGES[Number(id) % ZOMBIE_IMAGES.length] : '';
}

function escapeHtml(s) {
    return String(s).replace(/[&<>]"'/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}


window.addEventListener("load", init);
window.buyZombie = buyZombie;
