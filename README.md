# Degen Token (DGN)

An ERC20 token contract built for the Degen Gaming project.

![image](https://github.com/user-attachments/assets/03c20394-0bb9-4336-ad15-924f40607a70)


## Description

This project consists of a Solidity ERC20 token contract named Degen (DGN), deployed on the Fuji C-Chain testnet. It includes a Next.js frontend that interacts with the contract via the ethers library. This project serves as a deliverable for a blockchain development course and demonstrates the deployment, interaction, and management of an ERC20 token on a testnet.

## Getting Started

### Prerequisites

- **Node.js** and **npm** - Make sure you have Node.js installed to manage dependencies.
- **Hardhat** - Required for smart contract development and deployment.
- **Fuji Testnet Access** - You’ll need an Avalanche C-Chain wallet with testnet AVAX to deploy the contract.

### Installing

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/degen-token.git
   cd degen-token
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   - Set up a `.env` file with your Fuji testnet private key and an RPC URL for the Fuji network.

### Deploying the Contract

1. **Compile the contract**:
   ```bash
   npx hardhat compile
   ```

2. **Deploy to Fuji testnet**:
   ```bash
   npx hardhat run scripts/deploy.js --network fuji
   ```

### Running the Frontend

1. **Navigate to the frontend**:
   ```bash
   cd frontend
   ```

2. **Start the frontend**:
   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000`.

## Help

For common issues:

- **Hardhat compilation errors**: Try `npx hardhat clean` and recompile.
- **Fuji network connection issues**: Ensure RPC URL is correct and testnet AVAX is available.


## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
