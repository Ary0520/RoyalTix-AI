'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
    collaborators: Array<{ address: string; percentage: number }>;
    createdAt: string;
    imageBase64?: string;
  };
  generatedContent: string;
  status: string;
}

export default function ContentDetailPage() {
  const params = useParams();
  const [content, setContent] = useState<ContentItem | null>(null);

  useEffect(() => {
    fetchContent();
  }, [params.id]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/create-and-register');
      const data = await response.json();
      const item = data.items?.find((item: ContentItem) => item.contentId === params.id);
      setContent(item || null);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-xl text-gray-300">Asset not found</div>
          <Link 
            href="/marketplace"
            className="inline-block mt-4 text-purple-400 hover:text-purple-300"
          >
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-12">
          <Link 
            href="/marketplace" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            ← Back to Marketplace
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
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
            {/* Header */}
            <div className="p-8 border-b border-gray-800">
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 text-sm rounded-full font-medium">
                  {content.metadata.contentType === 'image' ? '🖼️ AI Image Asset' : '📝 Text Content Asset'}
                </span>
                <span className="text-sm text-gray-400">
                  Created {new Date(content.metadata.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {content.metadata.name}
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {content.metadata.description}
              </p>
            </div>

            {/* Content Preview */}
            <div className="p-8 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Asset Preview</h2>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                {content.metadata.imageBase64 && (
                  <div className="mb-6">
                    <img 
                      src={`data:image/png;base64,${content.metadata.imageBase64}`}
                      alt={content.metadata.name}
                      className="w-full max-w-md mx-auto h-auto rounded-lg border border-gray-600 shadow-lg"
                    />
                  </div>
                )}
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {content.generatedContent.substring(0, 500)}
                  {content.generatedContent.length > 500 && '...'}
                </div>
                {content.generatedContent.length > 500 && (
                  <p className="text-sm text-gray-400 mt-4 italic border-t border-gray-700 pt-4">
                    💎 Purchase a license to access the complete content
                  </p>
                )}
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="p-8 border-b border-gray-800 bg-gradient-to-r from-green-500/5 to-blue-500/5">
              <h2 className="text-2xl font-bold text-white mb-6">🔗 Blockchain Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-gray-400 text-sm mb-2">IP Asset ID</div>
                  <div className="font-mono text-xs text-green-400 break-all">{content.ipId}</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-gray-400 text-sm mb-2">Transaction Hash</div>
                  <div className="font-mono text-xs text-blue-400 break-all">{content.txHash}</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-gray-400 text-sm mb-2">License ID</div>
                  <div className="font-mono text-xs text-purple-400 break-all">{content.licenseId}</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl">
                  <div className="text-gray-400 text-sm mb-2">Status</div>
                  <div className="capitalize text-green-400 font-bold flex items-center gap-2">
                    ✅ {content.status}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a
                  href={`https://aeneid.storyscan.io/tx/${content.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  🔍 View on Story Explorer →
                </a>
              </div>
            </div>

            {/* License Pricing Display */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">💎 License Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(['personal', 'commercial', 'exclusive'] as const).map((type) => (
                  <div
                    key={type}
                    className="relative bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-3">
                        {type === 'personal' && '👤'}
                        {type === 'commercial' && '🏢'}
                        {type === 'exclusive' && '👑'}
                      </div>
                      <h3 className="font-bold capitalize mb-3 text-white text-lg">{type} License</h3>
                      <div className="text-3xl font-bold mb-4">
                        <span className="text-green-400">${content.metadata.licensing[type]}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {type === 'personal' && 'For personal, non-commercial use'}
                        {type === 'commercial' && 'For commercial use with attribution'}
                        {type === 'exclusive' && 'Exclusive rights, no attribution required'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Collaborators */}
              {content.metadata.collaborators.length > 0 && (
                <div className="mb-8 bg-gray-800/30 p-6 rounded-xl">
                  <h3 className="font-bold text-white mb-4">💰 Revenue Split</h3>
                  <div className="space-y-3">
                    {content.metadata.collaborators.map((collab, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
                        <span className="font-mono text-xs text-gray-300">{collab.address}</span>
                        <span className="text-purple-400 font-bold">{collab.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coming Soon Banner */}
              <div className="relative bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/30 rounded-2xl p-8 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-2xl blur-xl"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    FEATURE COMING SOON! STAY TUNED🔥
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Marketplace purchasing will be available soon. Get ready to license premium AI-generated IP assets!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      🎨 Create Your Own Asset
                    </Link>
                    <Link
                      href="/marketplace"
                      className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      ← Back to Marketplace
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}