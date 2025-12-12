"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

interface FeatureCard {
  emoji: string;
  headline: string;
  body: string;
}

const features: FeatureCard[] = [
  {
    emoji: "🤖",
    headline: "Ship Content at AI Speed",
    body: "From script to story, from code to character—generate professional-grade content in seconds using cutting-edge AI models."
  },
  {
    emoji: "🔒",
    headline: "Own What You Create. Forever.",
    body: "Every piece is automatically registered as IP on Story Protocol. Immutable proof of ownership that no one can steal or dispute."
  },
  {
    emoji: "💰",
    headline: "Get Paid on Autopilot",
    body: "Set your price. Split with collaborators. Earn royalties automatically every time someone licenses your work. No middlemen. No delays."
  }
];

export function FeaturesCards() {
  return (
    <section className="bg-black text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose RoyalTix AI?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The complete solution for AI content creators who want to own, protect, and monetize their work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 h-full hover:bg-gray-800/50 transition-all duration-300">
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
                  <div className="text-4xl mb-6">{feature.emoji}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.headline}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <a 
            href="/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Generate Your First IP Asset →
          </a>
        </div>
      </div>
    </section>
  );
}