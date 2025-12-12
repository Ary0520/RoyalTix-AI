export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-5xl font-bold mb-8">About RoyalTix AI</h1>
        
        <div className="space-y-8 text-lg text-gray-300">
          <p>
            RoyalTix AI is the first marketplace where AI-generated images are automatically registered 
            as intellectual property on the blockchain, providing creators with unprecedented control 
            over their digital assets.
          </p>
          
          <p>
            Built on Story Protocol's innovative IP infrastructure, our platform bridges the gap between 
            artificial intelligence and intellectual property rights, creating a new paradigm for digital 
            content ownership and monetization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-300">
                To democratize intellectual property rights in the age of AI, ensuring creators 
                maintain ownership and control over their AI-generated content.
              </p>
            </div>
            
            <div className="p-6 border border-gray-800 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-300">
                A world where AI-generated content is seamlessly integrated with blockchain-based 
                IP protection, creating new opportunities for creators and collectors alike.
              </p>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-gray-900 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Built on Story Aeneid Testnet</h3>
            <p className="text-gray-300">
              RoyalTix AI operates on Story Protocol's Aeneid testnet, leveraging cutting-edge 
              blockchain technology to provide real IP registration, licensing, and royalty 
              distribution for AI-generated content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}