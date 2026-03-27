# 🎨 RoyalTix AI - Blockchain IP Marketplace

**Transform AI-Generated Content into Valuable IP Assets**

<img width="1900" height="963" alt="image" src="https://github.com/user-attachments/assets/3cca4ba4-dd9a-46e3-8392-4b304950cefc" />

RoyalTix AI is a revolutionary platform that bridges the gap between AI content creation and blockchain-based intellectual property rights. Every piece of content generated or uploaded becomes a registered IP asset on Story Protocol, giving creators permanent ownership and automatic royalty streams.

## 🚀 Live Demo

**Platform Features:**
- **AI Content Generation**: Images via Hugging Face Flux, Text via Groq Llama 3.3
- **Blockchain IP Registration**: Real transactions on Story Protocol Aeneid testnet
- **IPFS Storage**: Permanent decentralized storage via Pinata
- **Creator Dashboard**: Portfolio management for IP assets
- **Marketplace**: Browse and discover registered IP assets

## 🏆 What Makes RoyalTix AI Special
<img width="1901" height="917" alt="image" src="https://github.com/user-attachments/assets/a3e88ee3-0f7c-49cb-ac21-c36689ebf060" />

### Real Blockchain Integration
- ✅ **Story Protocol**: Every asset is registered as IP on-chain
- ✅ **IPFS Storage**: Permanent, decentralized content storage
- ✅ **Transaction Verification**: All assets viewable on Story Explorer
- ✅ **Smart Contracts**: Automated licensing and royalty distribution

### AI-Powered Content Creation
- 🖼️ **Image Generation**: Hugging Face Flux model for high-quality visuals
- 📝 **Text Generation**: Groq Llama 3.3 70B for creative writing
- 📁 **Content Upload**: Register existing content as IP assets
- 🎨 **Multi-Format Support**: Images, text, articles, poems, and more

### Professional Web3 UX
- 🌟 **Modern Design**: Dark theme with glowing effects and animations
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized Next.js 14 with TypeScript
- 🔗 **Wallet Integration**: Seamless Web3 connectivity

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Blockchain & Web3
- **Story Protocol SDK** - IP registration and management
- **Viem & Wagmi** - Ethereum interaction
- **Story Aeneid Testnet** - Blockchain network

### AI & Storage
- **Hugging Face** - AI image generation (Flux model)
- **Groq** - AI text generation (Llama 3.3 70B)
- **Pinata** - IPFS storage and management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Web3 wallet (MetaMask recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/royaltix-ai.git
   cd royaltix-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   # Story Protocol Configuration
   NEXT_PUBLIC_STORY_RPC_URL=https://aeneid.storyrpc.io
   STORY_PRIVATE_KEY=your_wallet_private_key
   STORY_NFT_CONTRACT_ADDRESS=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc
   
   # AI Services
   HF_TOKEN=your_hugging_face_token
   GROQ_API_KEY=your_groq_api_key
   
   # Storage
   PINATA_JWT=your_pinata_jwt_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📋 API Keys Setup

### Story Protocol
- Get testnet tokens from [Story Faucet](https://faucet.story.foundation/)
- Use your wallet private key for `STORY_PRIVATE_KEY`

### Hugging Face
- Sign up at [Hugging Face](https://huggingface.co/)
- Create an API token in your settings

### Groq
- Sign up at [Groq](https://groq.com/)
- Generate an API key for Llama access

### Pinata
- Sign up at [Pinata](https://pinata.cloud/)
- Create a JWT token for IPFS uploads

## 🎯 Core Features

### 1. Content Creation
- **AI Generation**: Create unique images and text using state-of-the-art AI
- **Upload Support**: Register existing content as IP assets
- **Multi-Format**: Support for images, text, articles, poems, and creative writing

### 2. IP Registration
- **Blockchain Proof**: Every asset registered on Story Protocol
- **Immutable Ownership**: Permanent, tamper-proof ownership records
- **License Management**: Automatic licensing terms and royalty distribution

### 3. Creator Dashboard
- **Portfolio View**: Manage all your IP assets in one place
- **Analytics**: Track potential earnings and asset performance
- **Blockchain Links**: Direct access to transaction details

### 4. Marketplace
- **Asset Discovery**: Browse registered IP assets
- **Pricing Display**: Transparent licensing costs
- **Coming Soon**: Purchase functionality in development

## 🏗️ Architecture

```
RoyalTix AI
├── Frontend (Next.js 14)
│   ├── Landing Page
│   ├── Content Creation
│   ├── Creator Dashboard
│   └── Marketplace
├── Blockchain Layer
│   ├── Story Protocol SDK
│   ├── IP Asset Registration
│   └── Smart Contract Integration
├── AI Services
│   ├── Hugging Face (Images)
│   └── Groq (Text)
└── Storage Layer
    ├── IPFS (Pinata)
    └── Metadata Management
```

## 🎨 Design Philosophy

RoyalTix AI features a premium, Web3-native design with:
- **Dark Theme**: Professional blockchain aesthetic
- **Glowing Effects**: Interactive elements with smooth animations
- **Gradient Accents**: Purple/blue color scheme
- **Responsive Layout**: Mobile-first design approach

## 🔮 Roadmap

### Phase 1: Foundation ✅
- AI content generation
- Blockchain IP registration
- Basic marketplace UI

### Phase 2: Marketplace 🚧
- Purchase functionality
- Royalty distribution
- Advanced licensing options

### Phase 3: Community 📋
- Creator profiles
- Social features
- Collaboration tools

### Phase 4: Enterprise 📋
- API access
- Bulk operations
- Advanced analytics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Story Protocol** - For revolutionizing IP rights on blockchain
- **Hugging Face** - For democratizing AI model access
- **Groq** - For lightning-fast AI inference
- **Pinata** - For reliable IPFS infrastructure

---

**Built with ❤️ for the future of creator economy**

*RoyalTix AI - Where creativity meets blockchain innovation*
