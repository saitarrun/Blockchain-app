# 🧟‍♂️ CryptoZombies Battle Arena

A blockchain-based game where you can **create**, **battle**, and **trade** zombies using smart contracts.
Built as part of the **CryptoZombies Demo Project**.

---

## 👥 Team Members

| Name                            | CWID      |
| --------------------------------| --------- |
| Sai Tarrun Pitta                | 864188834 |
| Sunanda Vasanthi Tata           | 819805680 |
| Yashita Penubothu               | 826130510 |
| Sai Varnika Pulla Reddy         | 818758252 |

---

## ⚙️ How to Run the Project

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start a Local Blockchain (Optional)**
   Use Ganache GUI or:

   ```bash
   ganache-cli
   ```

3. **Compile Smart Contracts**

   ```bash
   truffle compile --all
   ```




4. **Deploy Contracts**

   ```bash
   truffle migrate --reset --network development
   truffle migrate --network development   # Local Ganache
   truffle migrate --network sepolia       # Sepolia testnet
   ```

5. **Check Deployed Contract Address**

   ```bash
   node -e "const a=require('./build/contracts/ZombieOwnership.json'); console.log(a.networks['1337']?.address||a.networks['5777']?.address||'no address')"
   ```

6. **Run the Frontend**
   Serve locally using BrowserSync:

   ```bash
   npx browser-sync start --server --port 3000 --files "index.html,*.js,build/contracts/*.json"
   ```

   Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Features and Improvements

1. Modernized frontend interface.
2. Integrated Ganache for local blockchain deployment.
3. MetaMask wallet connection for transaction signing.
( Ganache runs the local blockchain where your smart contracts are deployed, and        MetaMask acts as the wallet that connects your web app to Ganache to sign and         send those transactions. )
5. **Zombie Transfer** — transfer zombies between different wallets.
6. **Zombie Gallery** — view all your zombie images in one place.
7. **Zombie Factory** — create and manage multiple zombies.
8. **Battle Arena** — battle zombies against each other.
9. **Level-Up System** — upgrade your zombie’s stats and abilities.
10. Improved contract stability and UI responsiveness.

---

## 🧩 Tech Stack

* **Smart Contracts:** Solidity + Truffle
* **Blockchain:** Ganache (Local Ethereum)
* **Wallet:** MetaMask
* **Frontend:** HTML, CSS, JavaScript, Web3.js

---

