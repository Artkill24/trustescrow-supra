# 🔐 TrustEscrow

Decentralized P2P escrow platform with fair random arbitration on Supra L1 blockchain.

## 🌟 Features

- **Trustless Escrow**: Secure P2P transactions without intermediaries
- **Fair Arbitration**: Random arbiter selection using Supra dVRF
- **Fast & Cheap**: Built on Supra L1 (500k TPS, sub-second finality)
- **Transparent**: All transactions verifiable on-chain

## 🏗️ Project Structure
```
trustescrow-supra/
├── contract/          # Move smart contracts (Supra L1)
├── frontend/          # React web app
└── docs/             # Documentation
```

## 🚀 How It Works

1. **Buyer** deposits funds into escrow
2. **Seller** delivers goods/services
3. **Buyer** confirms delivery → Funds released
4. **Dispute?** → 3 random arbiters vote (selected via dVRF)

## 🛠️ Tech Stack

- **Blockchain**: Supra L1 (MoveVM)
- **Smart Contract**: Move language
- **Frontend**: React + Vite
- **Hosting**: Cloudflare Pages
- **Random Oracle**: Supra dVRF

## 📦 Installation

### Smart Contract
```bash
cd contract
# Install Supra CLI and deploy
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Live Demo

Coming soon on `project-block` domain!

## 📄 License

MIT License

## 🤝 Contributing

Contributions welcome! Open an issue or PR.

---

Built with ❤️ for the Supra community
