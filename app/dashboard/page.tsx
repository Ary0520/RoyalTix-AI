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
    imageBase64?: string;
  };
  generatedContent: string;
  status: string;
}

export default function DashboardPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
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

  const totalEarnings = items.reduce((sum, item) => {
    return sum + item.metadata.licensing.personal + item.metadata.licensing.commercial;
  }, 0);

  const totalContent = items.length;
  const avgPrice = totalContent > 0 ? totalEarnings / totalContent : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-300">Loading dashboard...</div>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Creator Dashboard
              </h1>
              <p className="text-xl text-gray-300">
                Manage your IP assets and track your blockchain portfolio
              </p>
            </div>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🎨 Create New Asset
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="relative group">
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <GlowingEffect
                disabled={false}
                proximity={100}
                spread={30}
                blur={1}
                movementDuration={0.8}
                borderWidth={2}
                className="rounded-2xl"
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{totalContent}</div>
                <div className="text-gray-400">IP Assets Created</div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <GlowingEffect
                disabled={false}
                proximity={100}
                spread={30}
                blur={1}
                movementDuration={0.8}
                borderWidth={2}
                className="rounded-2xl"
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold text-green-400 mb-2">${totalEarnings.toFixed(2)}</div>
                <div className="text-gray-400">Potential Earnings</div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <GlowingEffect
                disabled={false}
                proximity={100}
                spread={30}
                blur={1}
                movementDuration={0.8}
                borderWidth={2}
                className="rounded-2xl"
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2">📈</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">${avgPrice.toFixed(2)}</div>
                <div className="text-gray-400">Avg. Asset Value</div>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <GlowingEffect
                disabled={false}
                proximity={100}
                spread={30}
                blur={1}
                movementDuration={0.8}
                borderWidth={2}
                className="rounded-2xl"
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-3xl font-bold text-orange-400 mb-2">Soon</div>
                <div className="text-gray-400">Sales Coming</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Portfolio */}
        <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden">
          <GlowingEffect
            disabled={false}
            proximity={150}
            spread={40}
            blur={2}
            movementDuration={1}
            borderWidth={1}
            className="rounded-3xl"
          />
          
          <div className="relative z-10">
            <div className="p-8 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">🎨 Your IP Asset Portfolio</h2>
            </div>
            
            {items.length === 0 ? (
              <div className="p-16 text-center">
                <div className="relative inline-block mb-8">
                  <div className="text-8xl">🎯</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Create History?</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                  Start building your blockchain IP portfolio with AI-generated content that you truly own forever.
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🚀 Create Your First Asset
                </Link>
              </div>
            ) : (
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.contentId} className="relative group">
                      <div className="relative bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden hover:bg-gray-700/50 transition-all duration-300">
                        <div className="relative z-10">
                          {item.metadata.imageBase64 && (
                            <div className="aspect-video overflow-hidden">
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
                            
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                              {item.metadata.name}
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {item.metadata.description}
                            </p>
                            
                            {/* Pricing Grid */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              <div className="bg-gray-800/50 p-2 rounded-lg text-center">
                                <div className="text-xs text-gray-400">Personal</div>
                                <div className="text-green-400 font-bold text-sm">${item.metadata.licensing.personal}</div>
                              </div>
                              <div className="bg-gray-800/50 p-2 rounded-lg text-center">
                                <div className="text-xs text-gray-400">Commercial</div>
                                <div className="text-blue-400 font-bold text-sm">${item.metadata.licensing.commercial}</div>
                              </div>
                              <div className="bg-gray-800/50 p-2 rounded-lg text-center">
                                <div className="text-xs text-gray-400">Exclusive</div>
                                <div className="text-purple-400 font-bold text-sm">${item.metadata.licensing.exclusive}</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-full font-medium">
                                ✅ {item.status}
                              </span>
                              
                              <div className="flex gap-2">
                                <a
                                  href={`https://aeneid.storyscan.io/tx/${item.txHash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-xs font-medium"
                                >
                                  🔍 Explorer
                                </a>
                                <Link
                                  href={`/marketplace/${item.contentId}`}
                                  className="text-purple-400 hover:text-purple-300 text-xs font-medium"
                                >
                                  View Details →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}