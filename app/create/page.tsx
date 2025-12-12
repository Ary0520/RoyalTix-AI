'use client';

import { useState } from 'react';
import { useAccount } from '@/lib/web3-provider';
import { GlowingEffect } from '@/components/ui/glowing-effect';

type CreationMode = 'ai-generate' | 'upload';
type ContentType = 'image' | 'text';

export default function CreatePage() {
  const { address, isConnected } = useAccount();
  const [mode, setMode] = useState<CreationMode>('ai-generate');
  const [contentType, setContentType] = useState<ContentType>('image');
  const [prompt, setPrompt] = useState('');
  const [textContent, setTextContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [licensing, setLicensing] = useState({ personal: 10, commercial: 50, exclusive: 500 });
  const [collaborators, setCollaborators] = useState([{ address: '', percentage: 100 }]);
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      let requestBody: any = {
        mode,
        contentType,
        title,
        description,
        licensing,
        collaborators
      };

      if (mode === 'ai-generate') {
        if (contentType === 'image') {
          requestBody.prompt = prompt;
        } else {
          requestBody.textPrompt = prompt;
        }
      } else {
        if (contentType === 'text') {
          requestBody.textContent = textContent;
        } else {
          // Handle file upload - convert to base64
          if (uploadedFile) {
            const base64 = await fileToBase64(uploadedFile);
            requestBody.uploadedFile = base64;
            requestBody.fileName = uploadedFile.name;
            requestBody.fileType = uploadedFile.type;
          }
        }
      }

      const response = await fetch('/api/create-and-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      console.log('Create API Response:', data);
      setResult(data);
    } catch (error) {
      console.error('Error creating content:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const addCollaborator = () => {
    setCollaborators([...collaborators, { address: '', percentage: 0 }]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Create & Own Forever
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Generate AI content or upload your own. Every piece becomes a registered IP asset on Story Protocol.
            </p>
            {isConnected && (
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400">
                ✅ Wallet Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Mode Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Creation Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div
              onClick={() => setMode('ai-generate')}
              className={`relative group cursor-pointer transition-all duration-300 ${
                mode === 'ai-generate' ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              <div className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 ${
                mode === 'ai-generate' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 hover:border-gray-700'
              }`}>
                <GlowingEffect
                  disabled={mode !== 'ai-generate'}
                  proximity={100}
                  spread={30}
                  blur={1}
                  movementDuration={0.8}
                  borderWidth={2}
                  className="rounded-2xl"
                />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold mb-2">AI Generation</h3>
                  <p className="text-gray-400">Let AI create unique content from your prompts</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setMode('upload')}
              className={`relative group cursor-pointer transition-all duration-300 ${
                mode === 'upload' ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              <div className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 ${
                mode === 'upload' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800 hover:border-gray-700'
              }`}>
                <GlowingEffect
                  disabled={mode !== 'upload'}
                  proximity={100}
                  spread={30}
                  blur={1}
                  movementDuration={0.8}
                  borderWidth={2}
                  className="rounded-2xl"
                />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4">📁</div>
                  <h3 className="text-xl font-bold mb-2">Upload Content</h3>
                  <p className="text-gray-400">Upload your existing images or text content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Type Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Content Type</h2>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setContentType('image')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                contentType === 'image'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🖼️ Images
            </button>
            <button
              onClick={() => setContentType('text')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                contentType === 'text'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              📝 Text Content
            </button>
          </div>
        </div>

        {/* Main Creation Form */}
        <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 mb-8">
          <GlowingEffect
            disabled={false}
            proximity={150}
            spread={40}
            blur={2}
            movementDuration={1}
            borderWidth={1}
            className="rounded-3xl"
          />
          
          <div className="relative z-10 space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Give your creation a title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Brief description..."
                />
              </div>
            </div>

            {/* Content Creation Area */}
            {mode === 'ai-generate' ? (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {contentType === 'image' ? 'Image Description Prompt' : 'Text Generation Prompt'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 min-h-[120px]"
                  placeholder={
                    contentType === 'image'
                      ? "Describe the image you want to generate... (e.g., 'A futuristic city at sunset with flying cars')"
                      : "Describe what you want the AI to write... (e.g., 'A poem about space exploration' or 'A short article about renewable energy')"
                  }
                />
                <p className="text-sm text-gray-400 mt-2">
                  💡 Be specific and creative! The AI will generate unique {contentType} content based on your description.
                </p>
              </div>
            ) : (
              <div>
                {contentType === 'image' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Upload Image
                    </label>
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-gray-600 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-4xl mb-4">📁</div>
                        <p className="text-gray-300 mb-2">Click to upload an image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </label>
                      {uploadedFile && (
                        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                          <p className="text-green-400">✅ {uploadedFile.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Your Text Content
                    </label>
                    <textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 min-h-[200px]"
                      placeholder="Paste or type your text content here... (poems, articles, stories, etc.)"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Pricing Tiers */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                License Pricing (USD)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Personal Use</label>
                  <input
                    type="number"
                    value={licensing.personal}
                    onChange={(e) => setLicensing({...licensing, personal: Number(e.target.value)})}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Commercial Use</label>
                  <input
                    type="number"
                    value={licensing.commercial}
                    onChange={(e) => setLicensing({...licensing, commercial: Number(e.target.value)})}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Exclusive Rights</label>
                  <input
                    type="number"
                    value={licensing.exclusive}
                    onChange={(e) => setLicensing({...licensing, exclusive: Number(e.target.value)})}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Collaborators */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Collaborators & Revenue Split
              </label>
              {collaborators.map((collab, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Wallet address"
                    value={collab.address}
                    onChange={(e) => {
                      const updated = [...collaborators];
                      updated[index].address = e.target.value;
                      setCollaborators(updated);
                    }}
                    className="flex-1 p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="% share"
                    value={collab.percentage}
                    onChange={(e) => {
                      const updated = [...collaborators];
                      updated[index].percentage = Number(e.target.value);
                      setCollaborators(updated);
                    }}
                    className="w-24 p-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                </div>
              ))}
              <button
                onClick={addCollaborator}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                + Add Collaborator
              </button>
            </div>

            {/* Create Button */}
            <div className="pt-4">
              <button
                onClick={handleCreate}
                disabled={isCreating || (!prompt && !textContent && !uploadedFile)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isCreating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {mode === 'ai-generate' ? 'Generating & Registering IP...' : 'Uploading & Registering IP...'}
                  </span>
                ) : (
                  `🎨 ${mode === 'ai-generate' ? 'Generate' : 'Upload'} & Register as IP Asset`
                )}
              </button>
              
              {!isConnected && (
                <p className="text-sm text-gray-400 text-center mt-3">
                  💡 Connect your wallet to register content on the blockchain
                </p>
              )}
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-green-400 mb-3">🎨 Real Blockchain IP Registration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ul className="text-green-300 space-y-1">
                  <li>• ✅ {mode === 'ai-generate' ? 
                    (contentType === 'image' ? 'Hugging Face image AI' : 'Groq text AI (Llama 3.3)') : 
                    'Secure content upload'}</li>
                  <li>• ✅ IPFS storage via Pinata</li>
                  <li>• ✅ Story Protocol IP registration</li>
                </ul>
                <ul className="text-blue-300 space-y-1">
                  <li>• ✅ Immutable ownership proof</li>
                  <li>• ✅ Automatic licensing terms</li>
                  <li>• ✅ Viewable on Story Explorer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-3xl p-8">
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
              {result.success ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-400 mb-4">
                      🎉 IP Asset Created Successfully!
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400">
                      ✅ Registered on Story Protocol Blockchain
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Asset Details */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white mb-4">Asset Details</h3>
                      <div className="space-y-3">
                        <div className="bg-gray-800/50 p-4 rounded-xl">
                          <p className="text-gray-400 text-sm">Content ID</p>
                          <p className="text-white font-mono text-sm">{result.contentId}</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-xl">
                          <p className="text-gray-400 text-sm">IP Asset ID</p>
                          <p className="text-white font-mono text-sm break-all">{result.ipId}</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-xl">
                          <p className="text-gray-400 text-sm">Transaction Hash</p>
                          <p className="text-white font-mono text-sm break-all">{result.txHash}</p>
                        </div>
                        {result.licenseId && (
                          <div className="bg-gray-800/50 p-4 rounded-xl">
                            <p className="text-gray-400 text-sm">License ID</p>
                            <p className="text-white font-mono text-sm break-all">{result.licenseId}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Generated Content */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Your Content</h3>
                      <div className="bg-gray-800/50 p-4 rounded-xl">
                        {result.imageBase64 && (
                          <div className="mb-4">
                            <img 
                              src={`data:image/png;base64,${result.imageBase64}`}
                              alt="Generated Content"
                              className="w-full h-auto rounded-lg border border-gray-700 shadow-lg"
                            />
                          </div>
                        )}
                        {result.content && (
                          <div className="text-gray-300">
                            <p className="font-medium text-white mb-2">
                              {result.imageBase64 ? 'Description:' : 'Generated Text:'}
                            </p>
                            <div className={`${result.imageBase64 ? 'text-sm' : 'text-base'} whitespace-pre-wrap`}>
                              {result.content}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://aeneid.storyscan.io/tx/${result.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      🔍 View on Story Explorer →
                    </a>
                    <a
                      href="/dashboard"
                      className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      📊 View in Dashboard
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-red-400 mb-4">
                      ❌ Registration Failed
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-red-400">
                      Error: {result.error}
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
                    <p className="text-red-300 mb-2">{result.message}</p>
                    {result.details && (
                      <p className="text-red-400 text-sm">Details: {result.details}</p>
                    )}
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                    <h3 className="font-bold text-yellow-400 mb-3">How to Fix:</h3>
                    <ul className="text-yellow-300 text-sm space-y-2">
                      <li>• Ensure your .env.local has valid credentials</li>
                      <li>• Check your Story Protocol private key</li>
                      <li>• Verify your Hugging Face API token</li>
                      <li>• Make sure you have testnet tokens for gas fees</li>
                    </ul>
                  </div>

                  {result.generatedImage && (
                    <div className="mt-6 bg-gray-800/50 p-4 rounded-xl">
                      <h3 className="text-white font-bold mb-2">Generated Content (Not Registered):</h3>
                      <img 
                        src={`data:image/png;base64,${result.generatedImage}`}
                        alt="Generated but not registered"
                        className="w-full max-w-md mx-auto h-auto rounded-lg border border-gray-700"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}