# CryptoZombies Battle Arena

This is a CryptoZombies demo project, a game where you can create, battle, and trade zombies on the blockchain.

## Team Members

*   **Name:** [Your Name]
*   **CWID:** [Your CWID]
*   **Email:** [Your Email]

*   **Name:** [Team Member Name]
*   **CWID:** [Team Member CWID]
*   **Email:** [Team Member Email]

## How to Run the Project

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start a Local Blockchain:**
    Use Ganache GUI or run the following command:
    ```bash
    ganache-cli
    ```

3.  **Compile Contracts:**
    ```bash
    truffle compile
    ```

4.  **Deploy Contracts:**
    ```bash
  truffle migrate --reset --network development
    ```
5. **Get your main contract’s deployed address (from artifacts):**
    ```bash
    node -e "const a=require('./build/contracts/ZombieOwnership.json'); console.log(a.networks['1337']?.address||a.networks['5777']?.address||'no address')"
    ```

5.  **Serve the Frontend:**
    Install a simple HTTP server
    ```bash
    npx browser-sync start --server --port 3000 --files "index.html,*.js,build/contracts/*.json"
    ```
    
    You can now access the application in your browser at `http://localhost:8080`.

## Improvements Made

This project has been significantly improved and stabilized. Here is a summary of the changes:

