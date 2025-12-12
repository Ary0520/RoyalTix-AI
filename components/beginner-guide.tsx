'use client';

import { useState } from 'react';

export function BeginnerGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Web3 Beginner Guide</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🦊 Step 1: Install MetaMask</h4>
              <p className="text-gray-600">
                MetaMask is a browser wallet. Go to <a href="https://metamask.io" target="_blank" className="text-blue-600 underline">metamask.io</a> and install it.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🔗 Step 2: Connect Wallet</h4>
              <p className="text-gray-600">
                Click "Connect Wallet" in the top right corner and choose MetaMask.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🎨 Step 3: Try Creating</h4>
              <p className="text-gray-600">
                Go to the "Create" page and try generating some AI content. It's all in demo mode, so no real money involved!
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-purple-600 mb-2">🛒 Step 4: Browse Marketplace</h4>
              <p className="text-gray-600">
                Check out the marketplace to see how content buying/selling would work.
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
              <p className="text-xs text-blue-700">
                <strong>Built on Story Aeneid Testnet:</strong> This platform uses real blockchain technology on Story Protocol's testnet for IP registration and licensing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}