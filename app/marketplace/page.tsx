'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface ContentItem {
  contentId: string;
  ipId: string;
  txHash: string;
  licenseId: string;
  metadata: {
    name: string;
    description: string;
    contentType: string;
    licensing: { personal: number; commercial: number; exclusive: number };
    createdAt: string;
  };
  generatedContent: string;
  status: string;
}

export default function MarketplacePage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/create-and-register');
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => 
    filter === 'all' || item.metadata.contentType === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-300">Loading marketplace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              IP Asset Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover and license premium AI-generated content. Every asset is blockchain-verified IP.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { value: 'all', label: '🌟 All Assets', emoji: '🌟' },
              { value: 'image', label: '🖼️ AI Images', emoji: '🖼️' },
              { value: 'text', label: '📝 Text Content', emoji: '📝' },
              { value: 'artwork', label: '🎨 Digital Art', emoji: '🎨' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === filterOption.value
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="text-8xl mb-6">🏪</div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Marketplace Coming Soon</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Be the first to create and list AI-generated IP assets on the blockchain!
            </p>
            <Link 
              href="/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🎨 Create First Asset →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.contentId} className="relative group">
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300">
                  <GlowingEffect
                    disabled={false}
                    proximity={100}
                    spread={30}
                    blur={1}
                    movementDuration={0.8}
                    borderWidth={2}
                    className="rounded-2xl"
                  />
                  
                  <div className="relative z-10">
                    {item.metadata.imageBase64 && (
                      <div className="aspect-video overflow-hidden rounded-t-2xl">
                        <img 
                          src={`data:image/png;base64,${item.metadata.imageBase64}`}
                          alt={item.metadata.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 text-xs rounded-full font-medium">
                          {item.metadata.contentType === 'image' ? '🖼️ AI Image' : '📝 Text Content'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.metadata.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {item.metadata.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                        {item.metadata.description}
                      </p>
                      
                      {/* Pricing Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-400 mb-1">Personal</div>
                          <div className="text-green-400 font-bold">${item.metadata.licensing.personal}</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-400 mb-1">Commercial</div>
                          <div className="text-blue-400 font-bold">${item.metadata.licensing.commercial}</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-400 mb-1">Exclusive</div>
                          <div className="text-purple-400 font-bold">${item.metadata.licensing.exclusive}</div>
                        </div>
                      </div>
                      
                      <Link
                        href={`/marketplace/${item.contentId}`}
                        className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        View Asset Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}