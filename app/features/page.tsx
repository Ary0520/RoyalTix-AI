export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-5xl font-bold mb-8">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">🎨 AI Image Generation</h3>
            <p className="text-gray-300">Generate unique images using state-of-the-art Hugging Face AI models</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">⛓️ Blockchain IP Registration</h3>
            <p className="text-gray-300">Automatically register your creations as intellectual property on Story Protocol</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">💰 Smart Licensing</h3>
            <p className="text-gray-300">Flexible licensing tiers with automatic royalty distribution</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">📁 IPFS Storage</h3>
            <p className="text-gray-300">Decentralized storage ensures your content is always accessible</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">🔍 Transparent Marketplace</h3>
            <p className="text-gray-300">Browse and purchase IP assets with full blockchain verification</p>
          </div>
          <div className="p-6 border border-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">👥 Multi-Creator Support</h3>
            <p className="text-gray-300">Collaborate with others and split royalties automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
}