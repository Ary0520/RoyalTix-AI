export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-5xl font-bold mb-8">Technology</h1>
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Story Protocol</h2>
              <p className="text-gray-300 mb-4">
                Built on Story Protocol's Aeneid testnet, providing robust IP registration and licensing infrastructure.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Automatic NFT minting</li>
                <li>• IP asset registration</li>
                <li>• Smart contract licensing</li>
                <li>• Royalty distribution</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">AI Generation</h2>
              <p className="text-gray-300 mb-4">
                Powered by Hugging Face's advanced AI models for high-quality image generation.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• FLUX-dev model</li>
                <li>• Text-to-image generation</li>
                <li>• High-resolution outputs</li>
                <li>• Creative flexibility</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">IPFS Storage</h2>
              <p className="text-gray-300 mb-4">
                Decentralized storage via Pinata ensures your content is permanently accessible.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Immutable storage</li>
                <li>• Global accessibility</li>
                <li>• Censorship resistance</li>
                <li>• Metadata preservation</li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">Web3 Integration</h2>
              <p className="text-gray-300 mb-4">
                Seamless wallet connection and blockchain interaction for all users.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• MetaMask integration</li>
                <li>• Real-time transaction tracking</li>
                <li>• Gas optimization</li>
                <li>• Multi-wallet support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}